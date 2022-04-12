import axios from "axios";
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL
} from "../constants/productConstant";

export const productListAction = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products`);
        if (data.status) {
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data.All_Products
            })
        }

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
};

export const productDetailAction = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAIL_REQUEST });
        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/product/${id}`);

        if (data.status) {
            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: data.Product
            })
        }

    } catch (error) {

        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error.response.statusText
        })

    }
}