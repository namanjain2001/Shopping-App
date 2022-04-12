import { ADD_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, REMOVE_CART_ITEM, RESET_CART_ITEM } from "../constants/cartConstant";

const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find(p => p.product === item.product);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existingItem.product ? item : x)
                }
            } else {
                return {
                    ...state, cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case RESET_CART_ITEM:
            return {
                ...state,
                cartItems: []
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                userShippingAddress: action.payload
            }
        default: return state;
    }
}

export default cartReducer;