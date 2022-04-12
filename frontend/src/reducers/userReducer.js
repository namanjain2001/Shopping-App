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

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case USER_LOGIN_RESET:
            return {};
        case USER_LOGOUT:
            return {}
        default: return state;
    }
};

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                registerUserInfo: action.payload
            }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default: return state;
    }
};

export const userProfile = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true
            }
        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
};

export const getMyOrdersReducers = (state = { loading: false, orders: [] }, action) => {
    switch (action.type) {
        case GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: null
            }
        case GET_USER_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_USER_ORDERS_RESET:
            return {
                ...state,
                loading: false,
                orders: [],
                error: null
            };
        default:
            return state;
    }
};