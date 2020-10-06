import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import classes from "./ProfileElements.css";

class ProfileName extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col xs={4}>
                <img
                  src={"http://localhost:8080/" + this.props.imageUrl}
                  alt=""
                />
              </Col>
              <Col>
                <Card.Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2em",
                  }}
                >
                  Welcome, <br />
                  {this.props.userName}
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
