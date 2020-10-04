import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import ServerService from "../../Services/ServerService";
import classes from "./ProfileElements.css";

class ChangePassword extends Component {
  state = {
    input: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword,
    };

    ServerService.changePassword(data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

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
            <Form.Group>
              <Form.Label> Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Old Password"
                name="oldPassword"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                name="newPassword"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter New Password"
                name="confirmPassword"
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
