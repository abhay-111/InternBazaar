import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import classes from "./ProfileElements.css";
import userlogo from "../../assets/profile.svg";

class ProfileName extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col xs={4}>
                <img src={userlogo} alt="" />
              </Col>
              <Col>
                <Card.Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em",
                  }}
                >
                  Welcome, <br />
                  UserName
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileName;
