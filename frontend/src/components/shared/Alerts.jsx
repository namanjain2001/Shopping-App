import React from 'react';
import { Alert } from "react-bootstrap";

const Alerts = ({ children, variant }) => {
    return (
        <>
            <Alert variant={variant} style={{ "textAlign": "center" }}>{children}</Alert>
        </>
    )
}

export default Alerts;