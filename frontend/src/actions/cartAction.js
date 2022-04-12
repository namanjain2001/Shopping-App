import axios from "axios";
import { ADD_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM } from "../constants/cartConstant";

export const cartAction = (id, qty) => async (dispatch, getState) => {
    try {

        const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/product/${id}`);
        if (data.status) {
            dispatch({
                type: ADD_CART_ITEM,
                payload: {
                    product: data.Product._id,
                    name: data.Product.name,
                    price: data.Product.price,
                    image: data.Product.image,
                    countInStock: data.Product.countInStock,
                    qty
                }
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    } catch (error) {
        console.log(error);
    }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    } catch (error) {
        console.log(error);
    }
}

export const shippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });
    localStorage.setItem("userShippingAddress", JSON.stringify(data));
}