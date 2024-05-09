import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productDetailAction, productReviewAction } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { productReviewSlice } from '../reducers/productSlice';

function ProductScreen() {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const { id } = useParams();
    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const {product, loading, error} = productDetail;

    const productReview = useSelector(state => state.productReviewCreate);
    const {loading: loadingReview, error: errorReview, success: successReview} = productReview;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    useEffect(() => {
        dispatch(productDetailAction(id))
        if(successReview){
            setRating(0)
            setComment('')
            dispatch(productReviewSlice.actions.Reset())
        }
    }, [dispatch, id, successReview])

    const navigate = useNavigate();
    const addToCartHandler = () => {
        console.log('Add to cart: ', id)
        navigate(`/cart/${id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(productReviewAction(id, {rating, comment}))
    }

    return (
      <div>
        <Link to='/' className='btn btn-light my-3'>Quay lại</Link>
        {   loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : 
            (
                <div>
                    <Row className='py-5'>
                        <Col md={8}>
                            <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup>
                                    <ListGroup.Item variant='flush'>
                                        <Row>
                                            <Col>Price: </Col>
                                            <Col>
                                                <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                
                                    <ListGroup.Item variant='flush'>
                                        <Row>
                                            <Col>Trạng thái: </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
    
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Số lượng</Col>
                                                <Col xs='auto' className = 'my-1'>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) =>(
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
    
                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToCartHandler}
                                            disabled={product.countInStock === 0} 
                                            className='btn-block w-100' 
                                            type='button'>
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={12}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} đánh giá`} color={'#f8e825'} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Giá tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Row className='py-5'>
                        <Col md={6}>
                            <h4>Đánh giá</h4>
                            {product.reviews.length === 0 && <Message variant='info'>Không có đánh giá! Bạn đánh giá đi.</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color='#f8e825'/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h4>Viết đánh giá</h4>
                                    {loadingReview && <Loader/>}
                                    {errorReview && <Message variant='danger'>{errorReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' 
                                                    value={rating} 
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Chọn...</option>
                                                    <option value='1'>1 - Yếu</option>
                                                    <option value='2'>2 - Trung bình</option>
                                                    <option value='3'>3 - Tốt</option>
                                                    <option value='4'>4 - Rất tốt</option>
                                                    <option value='5'>5 - Xuất sắc</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Bình luận</Form.Label>
                                                <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                                            </Form.Group>
                                            <Button 
                                                className='my-3' 
                                                type='submit' 
                                                style={{'width': '100%'}} 
                                                variant='primary'
                                                disabled={loadingReview}
                                            >
                                                Gửi đi
                                            </Button>
                                        </Form>
                                    ) : <Message variant='info'>Làm ơn <Link to='/login'>Đăng nhập</Link> để viết đánh giá!!</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )
        }
      </div>
    );
}

export default ProductScreen;
