import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productDetailAction } from "../actions/productAction";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Row, Col, Container, Image, Form } from "react-bootstrap";
import Reviews from '../components/Reviews';
import Loader from "../components/shared/Spinner";
import Alert from "../components/shared/Alerts";

const ProductDetail = () => {

    const { productId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const singleProduct = useSelector((store) => { return store.productDetail });

    const { loading, product, error } = singleProduct;

    const [qty, setQty] = useState(1);

    useEffect(() => {
        dispatch(productDetailAction(productId));
    }, [dispatch]);

    const addToCartHandler = () => {
        navigate(`/cart/${product._id}?qty=${qty}`);
    }

    return (
        <>
            <section className="product_details_section py-4">
                <Container>
                    {
                        loading ?
                            <Col md={12} className="text-center">
                                <Loader variant={"warning"} />
                            </Col>
                            : error ? <Alert variant="danger">{error}</Alert> : (
                                <Row>
                                    <Col md={12}>
                                        <Link to="/" className="btn btn-outline-light my-4">
                                            <i className="fa-solid fa-arrow-left-long"></i>&nbsp; &nbsp;  Go Back
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        <div className="product_detail_product_image fit-image bg-white">
                                            <Image src={product.image} alt={product.name} title={product.name} />
                                        </div>
                                    </Col>
                                    <Col md={8}>
                                        <div className="product_detail_cont ps-md-5">

                                            <h1 className="product_title">
                                                {product.name}
                                            </h1>

                                            <Reviews value={product.rating} text={`${product.numOfReviews} reviews`} />

                                            <h2 className="product_price color-primary my-md-4 my-3">
                                                <strong>${product.price}</strong>
                                            </h2>

                                            <p className={"stock_status " + (product.countInStock >= 1 ? "in-stock text-success" : "out-of-stock text-danger")}>
                                                {product.countInStock >= 1 ?
                                                    (<React.Fragment><i className="fa-solid fa-circle-check me-1"></i> In Stock</React.Fragment>)
                                                    : (<React.Fragment><i className="fa-solid fa-circle-xmark me-1"></i> Out of Stock</React.Fragment>)}
                                            </p>

                                            <div className="product_description">
                                                {product.description}
                                            </div>
                                            {
                                                product.countInStock >= 1 && (
                                                    <div className="select_qty mt-md-4 mt-3">
                                                        <h6>Select Quantity</h6>
                                                        <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStock).keys()].map((allOpt) => {
                                                                    return (
                                                                        <option key={allOpt + 1} value={allOpt + 1}>{allOpt + 1}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Form.Select>
                                                    </div>
                                                )
                                            }


                                            <div className="add_to_cart mt-md-4 mt-3">
                                                <button type="submit" className="btn btn-primary" disabled={product.countInStock >= 1 ? null : "disabled"} onClick={() => addToCartHandler()}>
                                                    Add to cart
                                                </button>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            )
                    }
                </Container>
            </section>
        </>
    )
}

export default ProductDetail