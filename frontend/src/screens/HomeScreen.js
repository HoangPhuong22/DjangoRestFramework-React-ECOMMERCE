import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'

import { useDispatch, useSelector } from 'react-redux'
import { productHomeAction } from '../actions/productActions'
import { useParams, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductTop from '../components/ProductTop'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productHome)
  const { error, loading, products, page, pages } = productList
  const location = useLocation()
  const keyword = location.search;
  useEffect(() => {
    dispatch(productHomeAction(keyword))
  }, [dispatch, keyword])
  return (
    <div>
      <ProductTop/>
      <h1>Tất cả sản phẩm</h1>
      { 
        loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : 
        <Row>
          {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product}/>
              </Col>
          ))}
        </Row>
      }
      <Paginate pages={pages} page={page} keyword={keyword} />
    </div>
  )
}

export default HomeScreen
