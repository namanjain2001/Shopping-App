import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Spinner";
import Alert from "../components/shared/Alerts";
import CartBreadcrumbs from "../components/shared/CartBreadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { orderAction } from "../actions/orderAction";
import { PayPalButton } from "react-paypal-button-v2";
import { RESET_CART_ITEM } from "../constants/cartConstant";

const OrderSummary = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(store => store.cart);
    const { cartItems, userShippingAddress } = cart;
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;
    const order = useSelector(store => store.order);
    const { loading, orderInfo, error } = order;

    const [sdk, setSDK] = useState(false);
    const [paymentdecline, setPaymentdecline] = useState(false);

    const productsPrice = cartItems.reduce((acc, cartItems) => { return acc + cartItems.price * cartItems.qty }, 0).toFixed(2);

    const shippingPrice = productsPrice >= 100 ? 0 : 10;
    const totalPrice = (Number(productsPrice) + Number(shippingPrice)).toFixed(2);

    const addPaypalScript = async () => {
        const { data: PAYPAL_CLIENT_ID } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/config/paypal`);
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}`;
        script.async = true;
        script.onload = () => {
            setSDK(true);
        }
        document.body.appendChild(script);
    }

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate("/cart")
        }
        if (!window.paypal) {
            addPaypalScript();
        } else {
            setSDK(true);
        }

        if (orderInfo) {
            dispatch({ type: RESET_CART_ITEM });
            localStorage.removeItem("cartItems");
            navigate(`/order/${orderInfo.orderInfo._id}`)
        }

    }, [cartItems, orderInfo, addPaypalScript]);


    const placeOrderHandler = (paymentResult) => {

        if (paymentResult.status === "COMPLETED") {
            setPaymentdecline(false)
            dispatch(orderAction({
                orderItems: cartItems,
                shippingAddress: userShippingAddress,
                payment: userShippingAddress.paymentMethod,
                paymentResult: {
                    id: paymentResult.id,
                    status: paymentResult.status,
                    updateTime: paymentResult.update_time,
                    email_address: paymentResult.payer.email_address
                },
                isPaid: true,
                paidAt: Date.now(),
                user: userInfo._id,
                shippingPrice,
                totalPrice
            }));
        } else {
            setPaymentdecline("Your Payment was declined by payment method. Please try again.");
        }
    }

    return (
        <>
            <section className="order_summary my-5">
                <Container>
                    <Row>
                        {
                            loading ?
                                <Col md={12} className="text-center mb-4">
                                    <Loader variant={"warning"} />
                                </Col> : error ? <Alert variant="danger">{error}</Alert> : null
                        }
                        <Col md={8} className="offset-md-2">
                            <CartBreadcrumbs step1 step2 step3 />
                        </Col>
                        <Col md={8}>
                            <div className="order_summary_details">
                                <div className="order_summary_detail_block border border-white p-3">
                                    <h2>Address:</h2>
                                    <div className="order_summary_detail_block_cont mt-4">
                                        {userShippingAddress.address}, <br />
                                        {userShippingAddress.city}, <br />
                                        {userShippingAddress.postalCode},&nbsp;
                                        {userShippingAddress.country}
                                    </div>
                                </div>
                                <div className="payment_method_will mt-4">
                                    <Alert variant="warning">Your Payment Method will be <b className="text-uppercase">{userShippingAddress.paymentMethod}</b></Alert>
                                </div>
                                <div className="order_summary_detail_block border mt-4 border-white p-3">
                                    <h2>Order Items:</h2>
                                    <div className="order_summary_detail_block_cont mt-4">
                                        <div className="cart_items">
                                            <Table striped bordered hover className="vertical-align-middle">
                                                <thead>
                                                    <tr>
                                                        <th>Product Image</th>
                                                        <th>Product Name</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartItems.map((cartProducts, indexNo) => {
                                                            const { image, name, price, product, qty } = cartProducts;
                                                            return (
                                                                <tr key={indexNo}>
                                                                    <td className="cart_product_image">
                                                                        <Image src={image} alt={name} title={name} />
                                                                    </td>
                                                                    <td className="cart_product_name">
                                                                        <Link to={`/product/${product}`}>{name}</Link>
                                                                    </td>
                                                                    <td className="cart_product_price">
                                                                        <b>${price} &#215; {qty}  = <span className="color-primary">${Number(price) * Number(qty)}</span></b>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="cart_product_price_total p-3 text-center" colSpan={3}>
                                                            <b>
                                                                Product(s) Price : <span className="color-primary">
                                                                    ${productsPrice}
                                                                </span>
                                                            </b>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4} className="ps-md-4">
                            <div className="order_summary_calculation border border-1 p-3">
                                <h2 className="mb-4">Order Summary: </h2>
                                <ul className="order_summary_prices list-unstyled p-0 mb-4">
                                    <li>
                                        <b>
                                            Product(s) Price:&nbsp;
                                            <span className="color-primary">
                                                ${productsPrice}
                                            </span>
                                        </b>
                                    </li>
                                    <li className="mt-2">
                                        <b>
                                            Shipping Charges:&nbsp; <span className="color-primary">${shippingPrice}</span>
                                        </b>
                                    </li>
                                    <hr />
                                    <li className="mt-2">
                                        <b>
                                            Total Price:&nbsp; <span className="color-primary">${totalPrice}</span>
                                        </b>
                                    </li>
                                </ul>
                                {
                                    !sdk ? (<div className="text-center"><Loader variant={"warning"} /></div>) : <PayPalButton amount={totalPrice} onSuccess={placeOrderHandler} />
                                }
                                {
                                    paymentdecline && <Alert variant="danger">{paymentdecline}</Alert>
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default OrderSummary;