import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import user from "../../assets/user.png";

import classes from "./ProfileElements.css";

class ProfileName extends Component {
  render() {
    let src;
    if (this.props.imageUrl == "") {
      src = user;
    } else {
      src = "http://localhost:8080/" + this.props.imageUrl;
    }

    return (
      <Card className={classes.card}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Col xs={4}>
                <img src={src} className={classes.profileImage} alt="" />
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
