import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_RESET,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    GET_USER_ORDERS_RESET
} from "../constants/userConstant";

export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }
        );

        if (data.status) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.user_details
            });

            localStorage.setItem("userInfo", JSON.stringify(data.user_details));
        }

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};

export const logoutAction = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LOGIN_RESET });
    dispatch({ type: GET_USER_ORDERS_RESET });
    localStorage.removeItem("userInfo");
}

export const userRegistrationAction = (name, email, password) => async (dispatch) => {
    try {

        dispatch({ type: USER_REGISTER_REQUEST });

        const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/register`, {
            name, email, password
        });

        if (data.status) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data.message
            });
            console.log(data);
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.user_details
            });
            localStorage.setItem("userInfo", JSON.stringify(data.user_details));
        }

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const userProfileAction = (name, email, password) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_PROFILE_REQUEST
        });

        const { userLogin } = getState();
        const { userInfo } = userLogin;

        const { data } = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/user/profile`, {
            _id: userInfo._id,
            name,
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        );

        if (data.status) {
            dispatch({
                type: USER_PROFILE_SUCCESS,
                payload: data
            });
            console.log(data.user_details);
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data.user_details
            });
            localStorage.setItem("userInfo", JSON.stringify(data.user_details));
        }

    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyOrdersAction = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: GET_USER_ORDERS_REQUEST
        });

        const { userLogin } = getState();
        const { userInfo } = userLogin;

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/order/myorders/${userInfo._id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        );

        if (data.status) {
            dispatch({
                type: GET_USER_ORDERS_SUCCESS,
                payload: data
            });
        }

    } catch (error) {
        dispatch({
            type: GET_USER_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}