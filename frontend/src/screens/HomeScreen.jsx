import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../actions/productAction";
import { Row, Col, Container } from "react-bootstrap";
import ProductScreen from "../screens/ProductScreen";
import Loader from "../components/shared/Spinner";
import Alerts from "../components/shared/Alerts";

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productListing = useSelector((store) => { return store.productListing });
    const { loading, products, error } = productListing;
    useEffect(() => {
        dispatch(productListAction());
    }, [dispatch]);

    return (
        <>
            <section className="all-products-section py-5">
                <Container>
                    <Row>

                        {
                            loading ? (
                                <Col md={12} className="text-center">
                                    <Loader variant={"warning"} />
                                </Col>
                            ) : error ? <Alerts variant="danger">{error}</Alerts> :
                                products.map((allElemt, indexNo) => {
                                    return (
                                        <Col md={3} key={indexNo} className="mb-3">
                                            <ProductScreen product={allElemt} />
                                        </Col>
                                    )
                                })
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default HomeScreen;