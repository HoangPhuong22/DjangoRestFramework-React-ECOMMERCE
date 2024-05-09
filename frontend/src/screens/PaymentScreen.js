import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen() {
    const cart = useSelector(state => state.cart);
    const { shippingAdreess } = cart;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    // if (!shippingAdreess) {
    //     navigate('/shipping');
    // }
    const submitHandler = (e) => {
        console.log('Payment method:', paymentMethod);
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Phương thức thanh toán</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Chọn phương thức</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                        <Form.Check
                        type='radio'
                        label='Momo'
                        id='Momo'
                        name='paymentMethod'
                        value='Momo'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Tiếp tục</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
