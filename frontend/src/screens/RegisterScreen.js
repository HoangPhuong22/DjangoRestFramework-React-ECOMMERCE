import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const navigation = useNavigate();
    const dispatch = useDispatch();
    
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;

    useEffect(() => {
        console.log(userInfo);
        if(userInfo){
            navigation(redirect);
        }
    }, [navigation, userInfo, redirect]);

    const submitHandler = (e) =>
    {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Mật khẩu không khớp');
        }
        else{
            dispatch(register(name, email, password));
        }
    }
    console.log(error);
    return (
        <FormContainer>
            <h1>Đăng kí</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
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
                <Form.Group controlId='password'>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Nhập mật khẩu' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control 
                        required
                        type='password'
                        placeholder='Nhập lại mật khẩu' 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Đăng kí</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Bạn đã có tài khoản rồi à? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Đăng nhập</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
