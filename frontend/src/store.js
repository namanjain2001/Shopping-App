import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailReducer } from "./reducers/productReducer";
import { loginReducer, registerReducer, userProfile, getMyOrdersReducers } from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import { createOrder, getOrderReducer } from "./reducers/orderReducer";

const rootReducer = combineReducers({
    productListing: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: loginReducer,
    userRegister: registerReducer,
    userProfileDetail: userProfile,
    order: createOrder,
    getOrder: getOrderReducer,
    getMyOrders: getMyOrdersReducers
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const cartItemsStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const shippingAddressFromStorage = localStorage.getItem("userShippingAddress") ? JSON.parse(localStorage.getItem("userShippingAddress")) : {};

const initialState = {
    cart: { cartItems: cartItemsStorage, userShippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;