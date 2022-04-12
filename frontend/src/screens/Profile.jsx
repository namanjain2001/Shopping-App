import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Image } from "react-bootstrap";
import Alerts from "../components/shared/Alerts";
import Loader from '../components/shared/Spinner';
import { userProfileAction, getMyOrdersAction } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;
    const userProfileDetail = useSelector(store => store.userProfileDetail);
    var { loading, error, user } = userProfileDetail;
    const [customResponseMsg, setCustomResponseMsg] = useState(false);
    const [customResponseVarient, setCustomResponseVarient] = useState("danger");

    const getMyOrders = useSelector(store => store.getMyOrders);
    const { loading: loadingMyOrders, error: errorMyOrders, orders: ordersMyOrders } = getMyOrders;


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: userInfo !== null ? userInfo.name : "",
            email: userInfo !== null ? userInfo.email : ""
        }
    });

    const updateDetailHandler = async (data) => {
        const { name, email, password, cpassword } = data;

        if (password !== cpassword) {
            setCustomResponseMsg("Password and Confirm Password must be same");
            setCustomResponseVarient("danger");
            setTimeout(() => {
                setCustomResponseMsg(false);
            }, 3000);
        } else {
            dispatch(userProfileAction(name, email, password));
            setCustomResponseMsg("User Details has been updated");
            setCustomResponseVarient("success");
            setTimeout(() => {
                setCustomResponseMsg(false);
            }, 3000);
        }

    }

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
        dispatch(getMyOrdersAction());
    }, [userInfo, dispatch, getMyOrdersAction]);

    return (
        <>
            <section className='use_profile_section my-5'>
                <Container>
                    <Row>
                        {loading && (
                            <Col md={12} className="text-center">
                                <Loader variant={"warning"} />
                            </Col>
                        )}
                        <Col md={5}>
                            <div className="user_profile_details">
                                <Form onSubmit={handleSubmit(updateDetailHandler)}>

                                    <div className="form_group mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control${errors.name ? " is-invalid" : ""}`}
                                            id="name"
                                            {
                                            ...register(
                                                "name",
                                                {
                                                    required: "This field is required"
                                                }
                                            )
                                            }
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name.message}</div>
                                        )}
                                    </div>

                                    <div className="form_group mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className={`form-control${errors.email ? " is-invalid" : ""}`} id="email" {...register("email", {
                                            "required": "This field is required",
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                message: "Please enter a valid email address"
                                            }
                                        })} />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email.message}</div>
                                        )}
                                    </div>

                                    <div className="form-group mb-3">

                                        <label htmlFor="password" className="form-label">Password</label>

                                        <input className={`form-control${errors.password ? " is-invalid" : ""}`} type="password" id="password" {...register("password", {
                                            required: "This field is required."
                                        })} autoComplete="true" />

                                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}

                                    </div>

                                    <div className="form-group mb-3">

                                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>

                                        <input className={`form-control${errors.cpassword ? " is-invalid" : ""}`} type="password" id="cpassword" {...register("cpassword", {
                                            required: "This field is required."
                                        })} autoComplete="true" />

                                        {errors.cpassword && <div className="invalid-feedback">{errors.cpassword.message}</div>}

                                    </div>

                                    <div className="form-group mb-3">

                                        <button type="submit" className="btn btn-primary">Save</button>
                                        {
                                            error || customResponseMsg ? (
                                                <div className="mt-3">
                                                    <Alerts variant={customResponseVarient}>{customResponseMsg ? customResponseMsg : error}</Alerts>
                                                </div>
                                            ) : null
                                        }
                                    </div>

                                </Form>
                            </div>
                        </Col>
                        <Col md={7} className="ps-md-5">
                            <div className="order_summary_detail_block border mt-4 border-white p-3">
                                <h2>My Orders:</h2>

                                {
                                    loadingMyOrders && (
                                        <Col md={12} className="text-center">
                                            <Loader variant={"warning"} />
                                        </Col>
                                    )

                                }

                                {
                                    errorMyOrders && <div className="mt-4"><Alerts variant="danger">{errorMyOrders}</Alerts></div>
                                }

                                {
                                    ordersMyOrders.orderInfo && (
                                        <div className="order_summary_detail_block_cont mt-4">
                                            <div className="cart_items">
                                                <Table striped bordered hover className="vertical-align-middle">
                                                    <thead>
                                                        <tr>
                                                            <th>Product Image</th>
                                                            <th>Product Name</th>
                                                            <th>Price</th>
                                                            <th>Purchased On</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ordersMyOrders.orderInfo.slice(0).reverse().map((allOrders) =>
                                                                allOrders.orderItems.map((allOrderItems) => {
                                                                    return (
                                                                        <tr key={allOrderItems._id}>
                                                                            <td className="cart_product_image">
                                                                                <img src={allOrderItems.image} alt={allOrderItems.name} />
                                                                            </td>
                                                                            <td className="cart_product_name">
                                                                                <Link to={`/product/${allOrderItems.product}`}>{allOrderItems.name}</Link>
                                                                            </td>
                                                                            <td className="cart_product_price">
                                                                                <span className="color-primary">${allOrderItems.price}</span>
                                                                            </td>
                                                                            <td className="cart_product_purchased_on">
                                                                                {
                                                                                    allOrders.paidAt.split("T")[0]
                                                                                }
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Profile;