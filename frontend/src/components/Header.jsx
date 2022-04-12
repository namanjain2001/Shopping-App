import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import HomeScreen from '../screens/HomeScreen';
import ProductDetail from '../screens/ProductDetail';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';
import Profile from '../screens/Profile';
import ShippingAddress from '../screens/ShippingAddress';
import OrderSummary from '../screens/OrderSummary';
import OrderPlaced from '../screens/OrderPlaced';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(store => store.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logoutAction());
    navigate("/")
  }
  return (
    <>

      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopping App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp; Cart</Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name}>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={() => logoutUser()}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="ms-2"><i className="fa-solid fa-user"></i>&nbsp;&nbsp; Login</Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/product/:productId" element={<ProductDetail />}></Route>
        <Route path="/login/" element={<LoginScreen />} />
        <Route path="/register/" element={<SignUp />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/cart/:id" element={<CartScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order/:id" element={<OrderPlaced />} />
      </Routes>
    </>
  )
}

export default Header;