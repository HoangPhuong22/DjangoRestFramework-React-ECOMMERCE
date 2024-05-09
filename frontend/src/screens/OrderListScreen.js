import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

function OrderListScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <div>
        <h1>Danh sách các đơn hàng quản lý</h1>
        {loading ? <Loader/> : error ? 
        <Message variant='danger'>{error}</Message> 
        : 
        (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TÀI KHOẢN</th>
                <th>NGÀY</th>
                <th>TỔNG</th>
                <th>Thanh toán</th>
                <th>Giao hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                    <i className='fas fa-times' style={{ color: 'blue' }}></i>
                  )}</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>Xem chi tiết</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )
        }
    </div>
  )
}

export default OrderListScreen
