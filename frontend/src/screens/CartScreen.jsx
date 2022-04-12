import React, { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction, removeFromCart } from "../actions/cartAction";
import { Row, Col, Image, Container, Table, Form } from "react-bootstrap";
import Alerts from "../components/shared/Alerts";
import CartBreadcrumbs from '../components/shared/CartBreadcrumbs';

const CartScreen = () => {

    const { id } = useParams();
    const { search } = useLocation();
    const getProductQty = search ? Number(search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector(store => store.cart);
    const { cartItems } = cart;
    const navigate = useNavigate();
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (id && getProductQty) {
            dispatch(cartAction(id, getProductQty))
        }
    }, [dispatch, id, getProductQty]);

    const deleteCartItem = (product) => {

        if (cartItems.length === 1) {
            dispatch(removeFromCart(product));
            navigate("/cart")
        } else {
            dispatch(removeFromCart(product));
        }
    }

    const proceedToCheckout = () => {
        if (!userInfo) {
            navigate("/login");
        } else {
            navigate("/shipping")
        }
    }

    return (
        <>
            <section className="cart_section my-5">
                <Container>
                    <Row>

                        <Col md={8} className="offset-md-2">
                            <CartBreadcrumbs step1 />
                        </Col>

                        <Col md={12}>
                            <div className="section_heading text-uppercase">
                                <h1>Cart</h1>
                            </div>
                        </Col>
                        {
                            cartItems.length === 0 ?
                                <Col md={12} className="mt-3">
                                    <Alerts variant="danger">Your Cart is Empty. <Link to="/">Shop Now</Link></Alerts>
                                </Col> : (
                                    <React.Fragment>
                                        <Col md={8}>
                                            <div className="cart_items mt-4">
                                                <Table striped bordered hover className="vertical-align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>Product Image</th>
                                                            <th>Product Name</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cartItems.map((cartProducts, indexNo) => {
                                                                const { image, name, price, product, qty, countInStock } = cartProducts;
                                                                return (
                                                                    <tr key={indexNo}>
                                                                        <td className="cart_product_image">
                                                                            <Image src={image} alt={name} title={name} />
                                                                        </td>
                                                                        <td className="cart_product_name">
                                                                            <Link to={`/product/${product}`}>{name}</Link>
                                                                        </td>
                                                                        <td className="cart_product_price">
                                                                            ${price}
                                                                        </td>
                                                                        <td className="cart_product_quantity">
                                                                            {
                                                                                countInStock >= 1 && (
                                                                                    <Form.Select value={qty} onChange={(e) => dispatch(cartAction(product, Number(e.target.value)))}>
                                                                                        {
                                                                                            [...Array(countInStock).keys()].map((allOpt, indexNo) => {
                                                                                                return (
                                                                                                    <option key={allOpt + 1} value={allOpt + 1}>{allOpt + 1}</option>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </Form.Select>
                                                                                )
                                                                            }
                                                                        </td>
                                                                        <td className="cart_product_remove">
                                                                            <button className="btn btn-outline-danger" onClick={() => deleteCartItem(product)}>
                                                                                <i className="fa-solid fa-trash-can"></i>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </Col>
                                        <Col md={4} className="ps-md-4">
                                            <div className="cart_total p-3 text-center border border-1">
                                                <h4 className="mb-3">Subtotal ({
                                                    cartItems.reduce((accum, cartItems) => {
                                                        return accum + cartItems.qty;
                                                    }, 0)
                                                }) items </h4>
                                                <h5 className="mb-0">Total:&nbsp;
                                                    <b className="color-primary">
                                                        ${
                                                            cartItems.reduce((accum, cartItems) => {
                                                                return accum + cartItems.price * cartItems.qty;
                                                            }, 0).toFixed(2)
                                                        }
                                                    </b>
                                                </h5>
                                                <button className="btn btn-primary w-100 mt-4 p-3" onClick={() => proceedToCheckout()}>Proceed to checkout</button>
                                            </div>
                                        </Col>
                                    </React.Fragment>
                                )
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default CartScreen