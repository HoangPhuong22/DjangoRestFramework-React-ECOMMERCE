import {userUpdateSlice, userDeleteSlice, userListSlice, 
    userUpdateProfileSlice, userDetailSlice, userLoginSlice,
     userRegisterSlice } from "../reducers/userSlice"
import axios from "axios";
import { orderMyListSlice } from "../reducers/orderSlice";
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch(userLoginSlice.actions.Request());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('http://127.0.0.1:8000/api/users/login/',
        {'username': email, 'password': password}, config);

        dispatch(userLoginSlice.actions.Success(data));

        localStorage.setItem('userInfo', JSON.stringify(data));

    }catch(error)
    {
        dispatch(userLoginSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch(userLoginSlice.actions.Logout());
    dispatch(userRegisterSlice.actions.Logout());
    dispatch(userDetailSlice.actions.Reset());
    dispatch(orderMyListSlice.actions.Reset());
    dispatch(userListSlice.actions.Reset());
}


export const register = (name, email, password) => async (dispatch) => {
    try
    {
        dispatch(userRegisterSlice.actions.Request());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post('http://127.0.0.1:8000/api/users/register/',
        {'name': name, 'email': email, 'password': password}, config);

        dispatch(userRegisterSlice.actions.Success(data));
        dispatch(userLoginSlice.actions.Success(data));

        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error)
    {
        dispatch(userRegisterSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}

export const getUserDetail = (id) => async (dispatch, getState) => {
    try
    {
        dispatch(userDetailSlice.actions.Request());

        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, config);

        dispatch(userDetailSlice.actions.Success(data));
    }
    catch(error)
    {
        dispatch(userDetailSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try
    {
        dispatch(userUpdateProfileSlice.actions.Request());

        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/users/profile/update/`,user, config);

        dispatch(userUpdateProfileSlice.actions.Success(data));
        dispatch(userLoginSlice.actions.Success(data));
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    catch(error)
    {
        console.error("error");
        dispatch(userUpdateProfileSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.detail
        ));
    }
}
export const listUsers = () => async (dispatch, getState) => {
    try
    {
        dispatch(userListSlice.actions.Request());

        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`http://127.0.0.1:8000/api/users/`, config);
        dispatch(userListSlice.actions.Success(data));
    }
    catch(error)
    {
        dispatch(userListSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}
export const deleteUser = (id) => async (dispatch, getState) => {
    try
    {
        dispatch(userDeleteSlice.actions.Request());

        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        await axios.delete(`http://127.0.0.1:8000/api/users/delete/${id}`, config)
        dispatch(userDeleteSlice.actions.Success());
    }
    catch(error)
    {
        dispatch(userDeleteSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}
export const updateUser = (user) => async (dispatch, getState) => {
    try
    {
        dispatch(userUpdateSlice.actions.Request());

        const userInfo = getState().userLogin.userInfo;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/users/update/${user._id}/`, user, config);
        dispatch(userUpdateSlice.actions.Success(data));
    }
    catch(error)
    {
        dispatch(userUpdateSlice.actions.Fail(
            error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        ));
    }
}