import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-center py-2 mt-auto">
      <Container>
        <Row>
          <Col md={12}>
            Made with 🧡 by Naman Jain
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer