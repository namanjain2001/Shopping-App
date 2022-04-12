import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Container, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { shippingAddress } from "../actions/cartAction";
import CartBreadcrumbs from '../components/shared/CartBreadcrumbs';

const ShippingAddress = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;
    const cart = useSelector(store => store.cart);
    const { userShippingAddress } = cart;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            address: userShippingAddress ? userShippingAddress.address : "",
            city: userShippingAddress ? userShippingAddress.city : "",
            postalCode: userShippingAddress ? userShippingAddress.postalCode : "",
            country: userShippingAddress ? userShippingAddress.country : ""
        }
    });

    const shippingHandler = (data) => {
        dispatch(shippingAddress(data));
        navigate("/order-summary")
    }

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    });

    return (
        <>
            <section className="shipping_address_section my-5">
                <Container>
                    <Row>

                        <Col md={8} className="offset-md-2">
                            <CartBreadcrumbs step1 step2 />
                        </Col>
                    </Row>
                    <Form onSubmit={handleSubmit(shippingHandler)} className="mt-4">
                        <Row>
                            <Col md={8}>
                                <h1>Shipping Address</h1>

                                <div className="form-group mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" id="address"
                                        {
                                        ...register("address", {
                                            "required": "This field is required"
                                        })
                                        }
                                        className={`form-control${errors.address ? " is-invalid" : ""}`}
                                    />
                                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" id="city"
                                        {
                                        ...register("city", {
                                            "required": "This field is required"
                                        })
                                        }
                                        className={`form-control${errors.city ? " is-invalid" : ""}`}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="postalCode" className="form-label">Postal  Code</label>
                                    <input type="number" id="postalCode"
                                        {
                                        ...register("postalCode", {
                                            "required": "This field is required"
                                        })
                                        }
                                        className={`form-control${errors.postalCode ? " is-invalid" : ""}`}
                                    />
                                    {errors.postalCode && <div className="invalid-feedback">{errors.postalCode.message}</div>}
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" id="country"
                                        {
                                        ...register("country", {
                                            "required": "This field is required"
                                        })
                                        }
                                        className={`form-control${errors.country ? " is-invalid" : ""}`}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                                </div>
                            </Col>
                            <Col md={4} className="ps-md-4">
                                <div className="payment_method border border-1 p-3 text-center">
                                    <h4 className="mb-4">Payment Method</h4>
                                    <div className="mb-3 form-group">
                                        <div className="form-check d-md-table m-md-auto">
                                            <input className="form-check-input" type="radio" value="paypal" id="paypal"
                                                {
                                                ...register("paymentMethod")
                                                }
                                                defaultChecked />
                                            <label className="form-check-label" htmlFor="paypal">
                                                Paypal
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mt-4">
                                        <button type="submit" className="w-100 btn btn-primary p-3">Continue</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>

                </Container>
            </section>
        </>
    )
}

export default ShippingAddress;