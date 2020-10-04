import React, { Component } from "react";
import { Card, Row, Container } from "react-bootstrap";

import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class ViewOrganizationDetails extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const data = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
    };
    ServerService.viewProfile(data)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data.user });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            ORGANZATION DETAILS
          </Card.Title>
          <Container className={classes.data}>
            <Row>
              <h4>Organization Name : </h4> <span>{this.state.data.name}</span>
            </Row>
            <Row>
              <h4>Organization Description : </h4>{" "}
              <span style={{ paddingRight: "1rem" }}>
                {this.state.data.about}
              </span>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default ViewOrganizationDetails;
