import React, { Component } from "react";
import { Card } from "react-bootstrap";

import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class ViewResume extends Component {
  componentDidMount() {
    const data = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
    };
    ServerService.viewProfile(data)
      .then((response) => {
        console.log(response);
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
            VIEW RESUME
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default ViewResume;
