import { createSlice } from "@reduxjs/toolkit";

export const productHomeSlice = createSlice({
    name: 'productHome',
    initialState:{
        products: [],
        loading: true,
        error: '',
        page: 1, 
        pages: 1,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.products = [];
        },
        Success: (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState:{
        product: [],
        loading: true,
        error: ''
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
        },
        Success: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDeleteSlice = createSlice({
    name: 'productDelete',
    initialState:{
        loading: false,
        success: false,
        error: ''
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
        },
        Success: (state) => {
            state.loading = false;
            state.success = true;
            state.error = '';
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }
})
export const productCreateSlice = createSlice({
    name: 'productCreate',
    initialState:{
        loading: false,
        success: false,
        error: '',
        product: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
            state.product = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = '';
            state.product = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.product = null;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
            state.product = null;
        }
    }
})
export const productUpdateSlice = createSlice({
    name: 'productUpdate',
    initialState:{
        loading: false,
        success: false,
        error: '',
        product: null,
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
            state.product = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = '';
            state.product = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.product = null;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
            state.product = null;
        }
    }
})
export const productReviewSlice = createSlice({
    name: 'productReview',
    initialState:{
        loading: false,
        success: false,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.success = false;
            state.error = '';
        },
        Success: (state) => {
            state.loading = false;
            state.success = true;
            state.error = '';
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
        }
    }
})
export const productTopSlice = createSlice({
    name: 'productTop',
    initialState: {
        products: [],
        loading: true,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.loading = true;
            state.products = [];
            state.error = '';
        },
        Success: (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = '';
        },
        Fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.products = []
        },
    },
});