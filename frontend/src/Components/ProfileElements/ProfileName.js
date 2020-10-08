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
                  className={classes.profileImage}
                  alt=""
                />
              </Col>
              <Col xs={8}>
                <p className={classes.profileName}>{this.props.userName}</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileName;
