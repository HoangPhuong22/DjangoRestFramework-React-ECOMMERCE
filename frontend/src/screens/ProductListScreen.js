import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {productHomeAction, productDeleteAction,
  productCreateAction } from '../actions/productActions'
import { productCreateSlice } from '../reducers/productSlice'
import Paginate from '../components/Paginate'

function ProductListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productList = useSelector(state => state.productHome)
    const { loading, error, products, pages, page } = productList
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const location = useLocation()
    const keyword = location.search;

    useEffect(() => {
        dispatch(productCreateSlice.actions.Reset())
        if(!userInfo || !userInfo.isAdmin)
        {
            navigate('/login')
        }
        
        if(successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(productHomeAction(keyword))
        }
        
    }, [dispatch, navigate, userInfo, successDelete, successCreate, keyword])
    const deleteHandler = (id) => {
        if(window.confirm('Bạn muốn xóa sản phẩm này?')) {
            dispatch(productDeleteAction(id))
        }
    }
    const createProductHandler = () => {
        dispatch(productCreateAction())
    }
    return (
      <div>
        <Row className='align-items-center'>
          <Col>
            <h1>Sản phẩm</h1>
          </Col>
          <Col className='text-right'>
            <Button className='my-3' onClick={createProductHandler}>
              <i className='fas fa-plus'></i> Tạo mới sản phẩm
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TÊN SẢN PHẨM</th>
                  <th>GIÁ TIỀN</th>
                  <th>DANH MỤC</th>
                  <th>THƯƠNG HIỆU</th>
                  <th>CHỈNH SỬA</th>
                  <th>XÓA</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate page={page} pages={pages} isAdmin={true}/>
          </div>
          
        )}
      </div>
    )
}

export default ProductListScreen
