import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCard, removeCart } from '../actions/cartActions'

function CartScreen() {
  const {id} = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const productId = id
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  
  console.log('load')

  useEffect( () => {
    if(productId) {
      dispatch(addToCard(productId, qty))
    }
  }, [dispatch, productId])

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const removeFromCartHandler = (id) =>
  {
    dispatch(removeCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Giỏ hàng</h1>
        {cartItems.length == 0 ? 
          (
            <Message variant='info'>
              Giỏ hàng của bạn đang trống, tra cứu sản phẩm và thêm vào giỏ hàng nào! <Link to='/'>Quay lại</Link>
            </Message>
          ):
          (
            <ListGroup variant='flush'>
              {cartItems.map(item=>(
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={`http://127.0.0.1:8000${item.image}`} alt={item.name} fluid rounded/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => dispatch(addToCard(item.product, Number(e.target.value)))}
                      >
                        {
                            [...Array(item.countInStock).keys()].map((x) =>(
                                <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                </option>
                            ))
                        }
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
                
              }
            </ListGroup>
          )
        }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Tổng có ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) sản phẩm</h2>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className = 'btn-block'
                style={{width: '100%'}}
                disabled = {cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Tiến hành thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
          
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
