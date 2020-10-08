import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import classes from "./footer.css";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <h5>Get to Know Us</h5>
            <li>
              <a href="#!">Contact Us</a>
            </li>
            <li>
              <a href="#!">About Us</a>
            </li>
          </Col>
          <Col xs={6}>
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
        </Row>

        <div className={classes.copy}>
          &copy; Copyright {new Date().getFullYear()} InternBazaar
        </div>
      </Container>
    </div>
  );
};

export default Footer;
