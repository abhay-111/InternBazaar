import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import classes from "./ProfileElements.css";

class ChangePassword extends Component {
  submitHandler = (event) => {
    event.preventDefault();
  };

  handleChange = (event) => {};

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
            {" "}
            CHANGE PASSWORD{" "}
          </Card.Title>
          <Form onSubmit={this.submitHandler}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter New Password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default ChangePassword;
