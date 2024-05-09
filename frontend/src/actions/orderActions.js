import {orderDeliverSlice, orderListSlice, orderCreateSlice, orderDetailSlice, orderMyListSlice } from "../reducers/orderSlice";
import axios from 'axios';
import { orderPaySlice } from "../reducers/orderSlice";
export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderCreateSlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('http://127.0.0.1:8000/api/orders/add/', order, config);
        dispatch(orderCreateSlice.actions.Success(data));
    } catch (error) {
        dispatch(orderCreateSlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}
export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch(orderDetailSlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/api/orders/${id}/`, config);
        dispatch(orderDetailSlice.actions.Success(data));
    } catch (error) {
        dispatch(orderDetailSlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch(orderPaySlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/pay/`, paymentResult, config);
        dispatch(orderPaySlice.actions.Success(data));
    } catch (error) {
        dispatch(orderPaySlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderMyListSlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('http://127.0.0.1:8000/api/orders/myorders/', config);
        dispatch(orderMyListSlice.actions.Success(data));
    } catch (error) {
        dispatch(orderMyListSlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}
export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch(orderListSlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('http://127.0.0.1:8000/api/orders/', config);
        dispatch(orderListSlice.actions.Success(data));
    }
    catch (error) {
        dispatch(orderListSlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}
export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch(orderDeliverSlice.actions.Request());
        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/orders/${order._id}/deliver/`,{}, config);
        dispatch(orderDeliverSlice.actions.Success(data));
    }
    catch (error) {
        dispatch(orderDeliverSlice.actions.Fail(error.response && error.response.data.detail ? error.response.data.detail : error.message));
    }
}