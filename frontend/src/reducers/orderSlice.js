import { createSlice } from '@reduxjs/toolkit';

export const orderCreateSlice = createSlice({ 
    name: 'orderCreate',
    initialState: {
        loading: false,
        success: false,
        error: null,
        order: {},
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.order = {};
        }
    }
})

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        loading: true,
        order : null,
        success: false,
        error: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.success = true;
            state.order = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.order = null;
        }
    },
})

export const orderPaySlice = createSlice({
    name: 'orderPay',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        Success: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
})

export const orderMyListSlice = createSlice({
    name: 'orderList',
    initialState: {
        loading: false,
        orders: [],
        error: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.error = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        Reset: (state, action) => {
            state.loading = false;
            state.orders = [];
            state.error = null;
        }
    }
})
export const orderListSlice = createSlice({
    name: 'orderList',
    initialState: {
        loading: false,
        orders: [],
        error: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.error = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.orders = [];
            state.error = null;
        }
    }
})
export const orderDeliverSlice = createSlice({
    name: 'orderDeliver',
    initialState: {
        loading: false,
        success: false,
        error: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        Success: (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        }
    },
})