import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {loading, userInfo, error} = userLogin;
    console.log(redirect);
    useEffect(() => {
        if(userInfo){
            navigation(redirect);
        }
    }, [navigation, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    return (
        <FormContainer>
            <h1>Đăng nhập</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Nhập địa chỉ email của bạn...' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password'
                            placeholder='Nhập mật khẩu của bạn...' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>Đăng nhập</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Bạn là khách hàng mới ư ? Vui lòng   
                    <Link 
                        to={redirect 
                        ? `/register?redirect=${redirect}` 
                        : '/register'}> Đăng kí
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;
