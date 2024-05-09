import axios from "axios";
import {productDeleteSlice, productDetailSlice, 
    productReviewSlice, productUpdateSlice, 
    productCreateSlice, productHomeSlice, 
    productTopSlice} from "../reducers/productSlice";
export const productHomeAction = (keyword = '') => async (dispatch) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productHomeSlice.actions.Request());
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products${keyword}`)
        // Gọi action creator với data làm argument và dispatch action trả về
        dispatch(productHomeSlice.actions.Success(data));

    } catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productHomeSlice.actions.Fail(errorMessage));
    }
}

export const productDetailAction = (id) => async (dispatch) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productDetailSlice.actions.Request());
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        // Gọi action creator với data làm argument và dispatch action trả về
        dispatch(productDetailSlice.actions.Success(data));

    } catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productDetailSlice.actions.Fail(errorMessage));
    }
}

export const productDeleteAction = (id) => async (dispatch, getState) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productDeleteSlice.actions.Request());
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`http://127.0.0.1:8000/api/products/delete/${id}`, config)
        // Gọi action creator và dispatch action trả về
        dispatch(productDeleteSlice.actions.Success());
    } catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productDeleteSlice.actions.Fail(errorMessage));
    }
}
export const productCreateAction = () => async (dispatch, getState) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productCreateSlice.actions.Request());
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('http://127.0.0.1:8000/api/products/create/', {}, config) 
        // Gọi action creator và dispatch action trả về
        dispatch(productCreateSlice.actions.Success(data));
    }
    catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productCreateSlice.actions.Fail(errorMessage));
    }

}

export const productUpdateAction = (product) => async (dispatch, getState) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productUpdateSlice.actions.Request());
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`http://127.0.0.1:8000/api/products/update/${product._id}/`, product, config)
        // Gọi action creator và dispatch action trả về
        dispatch(productUpdateSlice.actions.Success(data));
        dispatch(productDetailSlice.actions.Success(data));
    }
    catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productUpdateSlice.actions.Fail(errorMessage));
    }
}
export const productReviewAction = (productId, review) => async (dispatch, getState) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productReviewSlice.actions.Request());
        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`http://127.0.0.1:8000/api/products/${productId}/reviews/`, review, config);
        // Gọi action creator và dispatch action trả về
        dispatch(productReviewSlice.actions.Success());
    }
    catch(error)
    {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productReviewSlice.actions.Fail(errorMessage));
    }
}

export const productTopActions = () => async (dispatch) => {
    try {
        // Gọi action creator và dispatch action trả về
        dispatch(productTopSlice.actions.Request());
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/top`)
        // Gọi action creator với data làm argument và dispatch action trả về
        dispatch(productTopSlice.actions.Success(data));

    } catch (error) {
        // Tạo message từ error và dispatch action fail
        const errorMessage = error.response && error.response.data.detail 
                             ? error.response.data.detail : error.message;
        dispatch(productTopSlice.actions.Fail(errorMessage));
    }
}