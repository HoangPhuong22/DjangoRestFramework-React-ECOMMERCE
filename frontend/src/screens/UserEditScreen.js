import React, {useState, useEffect, useId} from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { updateUser, getUserDetail } from '../actions/userActions';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { userUpdateSlice } from '../reducers/userSlice';

function UserEditScreen() {
    const {id} =  useParams();
    const userId = id
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetail);
    const {loading, user, error} = userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const {loading: loadingUpdate, success: successUpdate, error: errorUpdate} = userUpdate;

    useEffect(() => {
        if(successUpdate)
        {
            dispatch(userUpdateSlice.actions.Reset());
            navigation('/admin/userlist');
        }
        else
        {
            if(!user || (user && (user._id !== Number(userId) || !user.name))){
                dispatch(getUserDetail(userId));
            }
            else
            {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, userId, user, successUpdate, navigation]);

    const submitHandler = (e) =>
    {
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}));
    }
    console.log(error);
    return (
        <div>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Quay lại</Link>
            <FormContainer>
                <h1>Chỉnh sửa người dùng</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                (<Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Tên</Form.Label>
                        <Form.Control 
                            required
                            type='name'
                            placeholder='Nhập tên' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type='email'
                            placeholder='Nhập email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='isadmin'>
                        <Form.Check 
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin} 
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>Chấp nhận</Button>
                </Form>
                )
                }
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
