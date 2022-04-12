import React from 'react'
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Reviews from '../components/Reviews';

const ProductScreen = ({ product }) => {

    const { image, name, _id, rating, numOfReviews, price } = product;

    return (
        <>

            <Card className="card_custom">

                <Link to={`/product/${_id}`} className="d-block card_custom_img">
                    <Card.Img variant="top" src={image} />
                </Link>

                <Card.Body>

                    <Link to={`/product/${_id}`}>
                        <Card.Title><strong>{name}</strong></Card.Title>
                        <Card.Text as="div" className="mt-2 mb-3">
                            <Reviews value={rating} text={`${numOfReviews} reviews`} />
                        </Card.Text>
                        <Card.Text as="div" className="product_price_block">
                            <strong>${price}</strong>
                        </Card.Text>
                    </Link>

                </Card.Body>

            </Card>

        </>
    )
}

export default ProductScreen;