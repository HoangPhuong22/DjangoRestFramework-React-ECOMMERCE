import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { productTopActions } from '../actions/productActions'

function ProductTop() {

    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTop)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(productTopActions())
    }, [dispatch])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Carousel pause='hover' className='bg-dark'>
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} fluid />
                                <Carousel.Caption className='carousel.caption'>
                                    <h4>{product.name} ({new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default ProductTop
