import { configureStore } from '@reduxjs/toolkit';
import { productDeleteSlice, productHomeSlice, 
  productReviewSlice, productUpdateSlice, 
  productTopSlice, productCreateSlice, productDetailSlice } from './reducers/productSlice';

import { cartSlice } from './reducers/cartSlice';

import {userListSlice, userUpdateProfileSlice, userDeleteSlice ,
  userUpdateSlice,  userLoginSlice, userRegisterSlice, userDetailSlice } from './reducers/userSlice';

  import {orderListSlice, orderCreateSlice, orderDetailSlice, 
    orderDeliverSlice,  orderPaySlice, orderMyListSlice } from './reducers/orderSlice';


const store = configureStore({
  reducer: {
    productHome: productHomeSlice.reducer,
    productDetail: productDetailSlice.reducer,
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    productUpdate: productUpdateSlice.reducer,
    productReviewCreate: productReviewSlice.reducer,
    productTop : productTopSlice.reducer,
    
    cart: cartSlice.reducer,

    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetail: userDetailSlice.reducer,
    userUpdate: userUpdateProfileSlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateSlice.reducer,

    
    orderCreate: orderCreateSlice.reducer,
    orderDetail: orderDetailSlice.reducer,
    orderPay: orderPaySlice.reducer,
    orderMyList: orderMyListSlice.reducer,
    orderList: orderListSlice.reducer,
    orderDeliver: orderDeliverSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Kích hoạt Redux DevTools trong môi trường không phải production
});

export default store