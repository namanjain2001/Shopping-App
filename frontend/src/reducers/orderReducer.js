import { ORDER_REQUEST, ORDER_SUCCESS, ORDER_FAIL, ORDER_RESET, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL } from "../constants/orderConstant";

export const createOrder = (state = {}, action) => {

    switch (action.type) {
        case ORDER_REQUEST:
            return {
                loading: true
            };
        case ORDER_SUCCESS:
            return {
                loading: false,
                orderInfo: action.payload
            }
        case ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_RESET:
            return {};
        default:
            return state;
    }

}

export const getOrderReducer = (state = { loading: true, getOrderInfo: {} }, action) => {

    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                getOrderInfo: action.payload
            }
        case GET_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}