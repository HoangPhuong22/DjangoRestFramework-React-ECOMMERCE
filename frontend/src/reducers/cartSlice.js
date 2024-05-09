import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                JSON.parse(localStorage.getItem('cartItems')) :[]

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
                JSON.parse(localStorage.getItem('shippingAddress')) :{}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
                JSON.parse(localStorage.getItem('paymentMethod')) :{}

export const cartSlice = createSlice({
    name : 'cart',
    initialState:{
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
        
            if (existItem) {
                state.cartItems = state.cartItems.map(x => x.product === existItem.product ? item : x);
            } else {
                state.cartItems.push(item);
            }
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(x => x.product != action.payload)
        },
        saveShippingAdreess: (state, action) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        reset: (state) => {
            state.cartItems = []
        }
    }
})