import React from 'react';
import { Spinner } from "react-bootstrap";

const Loader = ({ variant }) => {
    return (
        <>
            <Spinner animation="border" variant={variant} style={{ width: "60px", height: "60px" }} />
        </>
    )
}

export default Loader;