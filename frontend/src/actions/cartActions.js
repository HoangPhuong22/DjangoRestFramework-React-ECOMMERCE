import axios from "axios";
import { cartSlice } from "../reducers/cartSlice";

export const addToCard = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)

    dispatch(cartSlice.actions.addItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty
    }));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}
export const cartReset = () => async (dispatch) => {
    dispatch(cartSlice.actions.reset())
    localStorage.removeItem('cartItems');
}
export const removeCart = (id) => async (dispatch, getState) => {
    dispatch(cartSlice.actions.removeItem(id))

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAdreess = (data) => async (dispatch) => {
    dispatch(cartSlice.actions.saveShippingAdreess(data))
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch(cartSlice.actions.savePaymentMethod(data))
    localStorage.setItem('paymentMethod', JSON.stringify(data));
}