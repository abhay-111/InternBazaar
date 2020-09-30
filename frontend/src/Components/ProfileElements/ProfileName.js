import React, { Component } from "react";
import { Card } from "react-bootstrap";

import classes from "./ProfileElements.css";
import userlogo from "../../assets/profile.svg";

class ProfileName extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <Card.Body style={{ display: "flex" }}>
          <img src={userlogo} alt="" />
          <div
            style={{ fontWeight: "bold", fontSize: "1.3rem", padding: "1rem" }}
          >
            Welcome, <br />
            UserName
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ProfileName;
