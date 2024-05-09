import React, { useEffect } from 'react'
import { Button, Row, Col, Table, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderDetail, payOrder } from '../actions/orderActions'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { orderDeliverSlice, orderDetailSlice, orderPaySlice } from '../reducers/orderSlice'
import { deliverOrder } from '../actions/orderActions'
function OrderScreen() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderDetail = useSelector(state => state.orderDetail)
    const { loading, success, error} = orderDetail
    const orderOrigin = orderDetail.order
    const order = {...orderOrigin}
    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay, error: errorPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver, error: errorDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo) navigate('/login')
        if(!order || successPay ||  order._id !== Number(id) || successDeliver)
        {
            dispatch(orderPaySlice.actions.Reset())
            dispatch(orderDeliverSlice.actions.Reset())
            dispatch(getOrderDetail(id))
        }
    }, [dispatch, successPay , id, successDeliver])

    const successPaymentHandler = (paymentMethod) => {
        dispatch(payOrder(order._id, paymentMethod))
    }
    const deliverHandler = () =>
    {
        dispatch(deliverOrder(order))
    }
    return loading ? <Loader /> : error ? 
    <Message variant='danger'>{error}</Message> :
    (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Thông tin giao hàng</h2>
                            {order.isDelivered ? (
                                <Message variant='success'>{`Đã giao hàng vào ngày: ${new Date(order.deliveredAt).toLocaleString('vi-VN')}`}</Message>
                            ): (
                                <Message variant='warning'>{'Chưa giao hàng nhé'}</Message>
                            )}
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td><strong>Họ tên: </strong></td>
                                            <td><strong>{order.user.name}</strong></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email: </strong></td>
                                            <td><strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></strong></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>Nơi ở</td>
                                        <td>{order.shippingAddress.address}</td>
                                        </tr>
                                        <tr>
                                        <td>Thành phố</td>
                                        <td>{order.shippingAddress.city}</td>
                                        </tr>
                                        <tr>
                                        <td>Mã bưu điện</td>
                                        <td>{order.shippingAddress.postalCode}</td>
                                        </tr>
                                        <tr>
                                        <td>Quốc gia</td>
                                        <td>{order.shippingAddress.country}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Phương thức thanh toán</h2>
                            <strong>Phương thức: </strong>
                            {order.paymentMethod}
                            {order.isPaid ? (
                                <Message variant='success' className="mt-3">{`Đã thanh toán vào lúc: ${new Date(order.paidAt).toLocaleString('vi-VN')}`}</Message>
                            ): (
                                <Message variant='warning' className='mt-3'>{'Chưa thanh toán'}</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Danh sách mặt hàng</h2>
                            {order.orderItems.length === 0 ? <Message variant="danger">Mặt hàng của bạn rỗng</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={`http://127.0.0.1:8000`+ item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} x {item.qty} = {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.qty)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Tóm tắt đơn hàng</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Sản phẩm:</Col>
                                    <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.orderItems.reduce((acc, item) => acc + item.price*item.qty, 0))}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Phí ship:</Col>
                                    <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế:</Col>
                                    <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.taxPrice)}    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng</Col>
                                    <Col>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!order.isPaid && (
                                        <Button type='button' 
                                        className='btn btn-block' 
                                        style={{'width': '100%'}} 
                                        onClick={() => successPaymentHandler(true)}
                                        >
                                        Thanh toán
                                        </Button>
                                    )}
                                </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    {loadingDeliver && <Loader />}
                                    <Button type='button' 
                                    className='btn btn-block' 
                                    style={{'width': '100%'}} 
                                    onClick={deliverHandler}
                                    >
                                    Đã giao hàng
                                    </Button>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen
