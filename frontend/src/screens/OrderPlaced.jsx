import React, { useEffect } from 'react';
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/shared/Spinner";
import Alert from "../components/shared/Alerts";
import { Link, useParams } from "react-router-dom";
import { getOrderAction } from "../actions/orderAction";
import { ORDER_RESET } from '../constants/orderConstant';

const OrderPlaced = () => {

    const dispatch = useDispatch();
    const orderID = useParams();
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;
    const getOrder = useSelector(store => store.getOrder);
    const { loading, getOrderInfo, error } = getOrder;

    useEffect(() => {
        dispatch({ type: ORDER_RESET });
        dispatch(getOrderAction(orderID.id));
    }, [orderID.id, dispatch]);

    return (
        <>
            <section className="order_placed_section my-5">
                <Container>
                    <Row>
                        {
                            loading ?
                                <Col md={12} className="text-center mb-4">
                                    <Loader variant={"warning"} />
                                </Col> : error ? <Alert variant="danger">{error}</Alert> : (
                                    <Col md={12}>
                                        <div className="order_placed_cont">
                                            <h2 className="mt-4 alert alert-success">Hello {userInfo.name}, Thank You For Your Order #{orderID.id}</h2>
                                            <h5 className="mt-4">Payment Status: <b className="text-success">Paid</b></h5>
                                            <div className="order_summary_detail_block border border-white p-3 mt-4">
                                                <h2>Shipping Address:</h2>
                                                <div className="order_summary_detail_block_cont mt-4">
                                                    {getOrderInfo.orderInfo.shippingAddress.address}, <br />
                                                    {getOrderInfo.orderInfo.shippingAddress.city}, <br />
                                                    {getOrderInfo.orderInfo.shippingAddress.postalCode},&nbsp;
                                                    {getOrderInfo.orderInfo.shippingAddress.country}
                                                </div>
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
                                                                    getOrderInfo.orderInfo.orderItems.map((cartProducts, indexNo) => {
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
                                                                                ${getOrderInfo.orderInfo.totalPrice}
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
                                )
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default OrderPlaced;