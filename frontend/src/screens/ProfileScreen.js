import React, {useState, useEffect} from 'react';
import {Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetail, updateUserProfile } from '../actions/userActions';
import { useLocation, useNavigate } from 'react-router-dom';
import { userUpdateProfileSlice } from '../reducers/userSlice';
import { listMyOrders } from '../actions/orderActions';

function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigation = useNavigate();
    const dispatch = useDispatch();
    
    const userDetail = useSelector(state => state.userDetail);
    const {loading, user} = userDetail; const erorrDetail = userDetail.error;

    const userLogin = useSelector(state => state.userLogin);
    const userInfo = userLogin.userInfo;
    const userUpdateProfile = useSelector(state => state.userUpdate);
    const { success} = userUpdateProfile; const errorUpdate = userUpdateProfile.error;
    const orderListMy = useSelector(state => state.orderMyList);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
    
    useEffect(() => {
        if(!userInfo)
        {
            navigation('/login');
        }
        else
        {
            if(!user || !user.name || success || userInfo._id !== user._id)
            {
                dispatch(userUpdateProfileSlice.actions.Reset());
                dispatch(getUserDetail('profile'));
                dispatch(listMyOrders());
            }
            else
            {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigation, orders, userInfo, user, success, errorUpdate]);
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword || password === '' || confirmPassword === ''){
            setMessage('Passwords do not match');
        }
        else{
            setMessage('');
            dispatch(updateUserProfile({
                'id': user.id, 
                'name': name, 
                'email': email, 
                'password': password}));
            setShowPasswordFields(false);
        }
    }
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const handleUpdateProfileClick = () => {
        setShowPasswordFields(true);
    }
    
    return (
        <Row>
            <Col md={3}>
                <h2>Thông tin cá nhân</h2>
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {success && <Message variant='success'>{'Update user successfully!'}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {erorrDetail && <Message variant='danger'>{erorrDetail}</Message>}
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
                        readOnly={!showPasswordFields}
                    />
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            required
                            type='email'
                            placeholder='Nhập email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly={!showPasswordFields}
                        />
                    </Form.Group>
                    {showPasswordFields && (
                        <>
                            <Form.Group controlId='password'>
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Nhập mật khẩu' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                                <Form.Control 
                                    type='password'
                                    placeholder='Confirm password' 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button type='submit' variant='primary'>Chấp nhận</Button>
                        </>
                    )}
                    {!showPasswordFields && (
                        <Button type='button' variant='primary' onClick={handleUpdateProfileClick}>Chấp nhận</Button>
                    )}
                </Form>
            </Col>
            <Col md={9}>
                <h2>Đơn hàng của tôi</h2>
                {loadingOrders ? <Loader/> : 
                errorOrders ? <Message variant='danger'>{errorOrders}</Message> : 
                (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NGÀY ĐẶT</th>
                                <th>TỔNG TIỀN</th>
                                <th>THANH TOÁN</th>
                                <th>NHẬN HÀNG</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                                    <td>{new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(order.totalPrice)}</td>
                                    <td>{order.isPaid ? new Date(order.paidAt).toLocaleString('vi-VN') :
                                        (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                    }
                                    </td>
                                    <td>
                                        {order.isDelivered ? new Date(order.deliveredAt).toLocaleString('vi-VN') :
                                        (
                                            <i className='fas fa-times' style={{ color: 'blue' }}></i>
                                        )
                                        }
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='primary' className='btn-sm'>Xem chi tiết</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
