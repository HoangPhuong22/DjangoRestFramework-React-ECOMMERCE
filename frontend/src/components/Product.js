import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom';

function Product({product}) {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to ={`/product/${product._id}`}>
            <Card.Img src={`http://127.0.0.1:8000${product.image}`}/>
        </Link>
        <Card.Body>
            <Link to ={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as="div">
                <div className="my-3">
                    <Rating value={product.rating} text={`${product.numReviews} đánh giá`} color={'#f8e825'} />
                </div>
            </Card.Text>
            <Card.Text as="strong">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
