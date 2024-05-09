import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        loading: false,
        userInfo: userInfoFromStorage,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.userInfo = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.error = '';
            state.userInfo = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.userInfo = null;
            state.error = action.payload;
        },
        Logout: (state) => 
        {
            state.loading = false;
            state.userInfo = null;
            state.error = '';
        }
    },
});

export const userRegisterSlice = createSlice({
    name: 'userRegister',
    initialState: {
        loading: false,
        userInfo: null,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.userInfo = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.error = '';
            state.userInfo = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.userInfo = null;
            state.error = action.payload;
        },
        Logout: (state) => 
        {
            state.loading = false;
            state.userInfo = null;
            state.error = '';
        }
    },
});

export const userDetailSlice = createSlice({
    name: 'userDetail',
    initialState: {
        loading: false,
        user: null,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.user = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.user = null;
            state.error = '';
        }
    },  
});
export const userUpdateProfileSlice = createSlice({
    name: 'userUpdateProfile',
    initialState: {
        loading: false,
        success: false,
        userInfo: null,
        error: '',
    },
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.success = false;
            state.userInfo = null;
        },
        Success: (state, action) => {
            state.loading = false;
            state.error = '';
            state.success = true;
            state.userInfo = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.userInfo = null;
        },
        Reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = '';
            state.userInfo = null;
        }
    },
});

export const userListSlice = createSlice({
    initialState: {
        loading: false,
        users: [],
        error: '',
    },
    name: 'userList',
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.users = [];
        },
        Success: (state, action) => {
            state.loading = false;
            state.error = '';
            state.users = action.payload;
        },
        Fail: (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.payload;
        },
        Reset: (state) => {
            state.loading = false;
            state.users = [];
            state.error = '';
        }
    },
})

export const userDeleteSlice = createSlice({
    initialState: {
        loading: false,
        success: false,
        error: '',
    },
    name: 'userDelete',
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.success = false;
        },
        Success: (state) => {
            state.loading = false;
            state.error = '';
            state.success = true;
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
    },
})
export const userUpdateSlice = createSlice({
    initialState: {
        loading: false,
        success: false,
        error: '',
    },
    name: 'userUpdate',
    reducers: {
        Request: (state) => {
            state.error = '';
            state.loading = true;
            state.success = false;
        },
        Success: (state) => {
            state.loading = false;
            state.error = '';
            state.success = true;
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
    },
})