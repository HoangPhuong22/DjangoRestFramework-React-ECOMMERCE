import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Container, Nav, Image, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

function Header() {

  const userLogin = useSelector(state => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <header>
      <Navbar variant="dark" expand="lg" className="bg-primary" collapseOnSelect>
        <Container fluid>
          <Image src="/images/logo.png" rounded style={{ width: '40px', height: '40px' }}/>
          <LinkContainer to ='/'>
            <Navbar.Brand>LAPTOP SHOP</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox/>
            <Nav className="mr-auto">
              <LinkContainer to='/' className='mx-3'>
                <Nav.Link><i className="fa-solid fa-house"></i> Trang chủ</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart' className='mx-3'>
                <Nav.Link><i className="fas fa-shopping-cart"></i> Giỏ Hàng</Nav.Link>
              </LinkContainer>
              {userInfo 
                ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Thông tin</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                  </NavDropdown>
                ) 
                :
                (<LinkContainer to='/login' className='mx-3'>
                  <Nav.Link><i className="fas fa-user"></i> Đăng nhập</Nav.Link>
                </LinkContainer>)}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Tài khoản</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
