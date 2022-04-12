import React from 'react';
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CartBreadcrumbs = ({ step1, step2, step3, step4 }) => {
    return (
        <>
            <Nav className="justify-content-center mb-5 breadcrumb">
                <Nav.Item>
                    {
                        step1 ? (
                            <LinkContainer to="/cart">
                                <Nav.Link className="color-primary"><span className="d-block text-center">1</span>Cart</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <Nav.Link disabled><span className="d-block text-center">1</span>Cart</Nav.Link>
                        )
                    }
                </Nav.Item>
                <Nav.Item>
                    {
                        step2 ? (
                            <LinkContainer to="/shipping">
                                <Nav.Link className="color-primary"><span className="d-block text-center">2</span>Shipping</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <Nav.Link disabled><span className="d-block text-center">2</span>Shipping</Nav.Link>
                        )
                    }
                </Nav.Item>
                <Nav.Item>
                    {
                        step3 ? (
                            <LinkContainer to="/order-summary">
                                <Nav.Link className="color-primary"><span className="d-block text-center">3</span>Order Summary</Nav.Link>
                            </LinkContainer>
                        ) : (
                            <Nav.Link disabled><span className="d-block text-center">3</span>Order Summary</Nav.Link>
                        )
                    }
                </Nav.Item>
            </Nav>
        </>
    )
}

export default CartBreadcrumbs;