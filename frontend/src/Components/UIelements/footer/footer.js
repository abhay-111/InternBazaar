import React from "react";
import { Row, Col, Container } from 'react-bootstrap'; 
import classes from './footer.css'

const Footer = () => {
  return (
      <div  className={classes.Footer}>
          <Container>
        <Row>
          <Col md={4}>
            <h5>Get to Know Us</h5>
            <li>
                <a href="#!">Contact Us</a>
              </li>
              <li>
                <a href="#!">About Us</a>
              </li>

          </Col>
          <Col md={4}>
            <h5>Social</h5>
              <li>
                <a href="#!">Facebook</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Twitter</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Instagram</a>
              </li>
          </Col>
          <Col md={4}>
            <h5>Help</h5>
              <li>
                <a href="#!">FAQ</a>
              </li>
          </Col>
        </Row>
      
      <Row className={classes.Row}>
          
      &copy;  Copyright {new Date().getFullYear()} InternBazaar 
      </Row>
    </Container>
    </div>
      
  );
}

export default Footer;