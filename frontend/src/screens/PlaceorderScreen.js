import React, { useEffect } from 'react'
import { Button, Row, Col, Table, ListGroup, Image, Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { cartReset } from '../actions/cartActions'
import { orderCreateSlice } from '../reducers/orderSlice'

function PlaceorderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, error, order } = orderCreate
    const originalCart = useSelector(state => state.cart)
    const cart = {...originalCart }
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(0)
    cart.taxPrice = Number((0.082 * cart.itemsPrice).toFixed(0))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(0)
    if(!cart.paymentMethod) {
        navigate('/payment')
    }
    useEffect(() => {
        if (success) {
            dispatch(orderCreateSlice.actions.Reset())
            dispatch(cartReset())
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success])

    const placeOrder = (e) => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            {loading && <Loader />}
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Thông tin giao hàng</h2>
                            <p>
                                <Table striped bordered hover>
                                    <tbody>
                                        <tr>
                                        <td>Nơi ở</td>
                                        <td>{cart.shippingAddress.address}</td>
                                        </tr>
                                        <tr>
                                        <td>Thành phố</td>
                                        <td>{cart.shippingAddress.city}</td>
                                        </tr>
                                        <tr>
                                        <td>Mã bưu điện</td>
                                        <td>{cart.shippingAddress.postalCode}</td>
                                        </tr>
                                        <tr>
                                        <td>Quốc gia</td>
                                        <td>{cart.shippingAddress.country}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Phương thức thanh toán</h2>
                            <strong>Chọn : </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Danh sách đơn hàng</h2>
                            {cart.cartItems.length === 0 ? <Message variant="danger">Giỏ hàng của bạn rỗng rồi !</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={`http://127.0.0.1:8000` + item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={6}>
                                                   { new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)} x {item.qty} = {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.qty)}
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
                                    <Col as="strong">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Phí ship:</Col>
                                    <Col as="strong">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Thuế:</Col>
                                    <Col as="strong">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.taxPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tổng</Col>
                                    <Col as="strong">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrder} style={{width: '100%'}}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceorderScreen
