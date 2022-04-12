import React, { useEffect } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../actions/userAction";
import Alerts from "../components/shared/Alerts";
import Loader from "../components/shared/Spinner";
import { useNavigate, Link } from "react-router-dom";

const LoginScreen = () => {

    const dispatch = useDispatch();
    const userLogin = useSelector(store => store.userLogin);
    const { userInfo, loading, error } = userLogin;
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginSubmitHandler = async (data) => {

        dispatch(loginAction(data.email, data.password));
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo])

    return (
        <>
            <section className="login_section my-5">
                <Container>
                    <Row>
                        {loading && (
                            <Col md={12} className="text-center">
                                <Loader variant={"warning"} />
                            </Col>
                        )}
                        <Col md={8} className="offset-md-2">
                            <div className="custom_form_style">
                                <Form onSubmit={handleSubmit(loginSubmitHandler)}>

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

                                        <button type="submit" className="btn btn-primary">Login</button>
                                        {error ? (
                                            <div className="mt-3">
                                                <Alerts variant="danger">{error}</Alerts>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="form-group mb-3">
                                        <div className="user_redirect_login_signup">
                                            Don't have an account? <Link to="/register">Create here</Link>
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

export default LoginScreen;