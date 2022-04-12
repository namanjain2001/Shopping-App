import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegistrationAction } from "../actions/userAction";
import Alerts from "../components/shared/Alerts";
import Loader from "../components/shared/Spinner";

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userRegister = useSelector(store => store.userRegister);
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo } = userLogin;
    const { loading, error } = userRegister;
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [matchPassMsg, setMatchPassMsg] = useState(false);
    const registerSubmitHandler = (data) => {
        const { name, email, password, cpassword } = data;
        if (password === cpassword) {
            dispatch(userRegistrationAction(name, email, password, cpassword));
            setMatchPassMsg(false)
        } else {
            setMatchPassMsg("Password and Confirm Password must be same");
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo])

    return (
        <>
            <section className="register_section my-5">
                <Container>
                    <Row>
                        {loading && (
                            <Col md={12} className="text-center">
                                <Loader variant={"warning"} />
                            </Col>
                        )}
                        <Col md={8} className="offset-md-2">
                            <div className="custom_form_style">
                                <Form onSubmit={handleSubmit(registerSubmitHandler)}>

                                    <div className="form-group mb-3">

                                        <label htmlFor="name" className="form-label">Name</label>

                                        <input className={`form-control${errors.name ? " is-invalid" : ""}`} type="text" id="name" {...register("name", {
                                            required: "This field is required."
                                        })} />

                                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}

                                    </div>

                                    <div className="form-group mb-3">

                                        <label htmlFor="email" className="form-label">Email</label>

                                        <input className={`form-control${errors.email ? " is-invalid" : ""}`} type="email" id="email" {...register("email", {
                                            required: "This field is required.",
                                            pattern: {
                                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                message: "Please enter a valid email address"
                                            }
                                        })} />

                                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}

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

                                        <button type="submit" className="btn btn-primary">Register</button>
                                        {error || matchPassMsg ? (
                                            <div className="mt-3">
                                                <Alerts variant="danger">{matchPassMsg ? matchPassMsg : error}</Alerts>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="user_redirect_login_signup">
                                            Already have an account? <Link to="/login">Login here</Link>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default SignUp;