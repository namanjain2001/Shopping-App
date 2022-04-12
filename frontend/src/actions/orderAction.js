import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL } from "../constants/orderConstant";
import axios from "axios";

export const orderAction = (orderData) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_REQUEST
        });

        const { userLogin } = getState();
        const { userInfo } = userLogin;

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/order`, orderData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        });

        if (data.status) {
            dispatch({
                type: ORDER_SUCCESS,
                payload: data
            })
        }

    } catch (error) {
        dispatch({
            type: ORDER_FAIL,
            payload: error
        })
    }
}

export const getOrderAction = (orderID) => async (dispatch, getState) => {
    try {

        dispatch({
            type: GET_ORDER_REQUEST
        });

        const { userLogin } = getState();
        const { userInfo } = userLogin;

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/${orderID}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        });

        if (data.status) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: data
            })
        }

    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error
        })
    }
}