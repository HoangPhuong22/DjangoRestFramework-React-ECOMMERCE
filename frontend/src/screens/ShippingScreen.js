import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAdreess } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'


function ShippingScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAdreess({ address, city, postalCode, country }));
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Thông tin giao hàng</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Nơi ở</Form.Label>
                    <Form.Control 
                        required    
                        type='text'
                        placeholder='Nhập nơi ở' 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Nhập thành phố' 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Mã bưu điện</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Nhập mã' 
                        value={postalCode} 
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Quốc gia</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Nhập quốc gia' 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Tiếp tục</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
