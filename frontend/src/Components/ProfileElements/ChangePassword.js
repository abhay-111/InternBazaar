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
    errors: { passwordlen: "", confirmpw: "" },
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.validate()) {
      const data = {
        userId: localStorage.getItem("userId"),
        userType: localStorage.getItem("userType"),
        oldPassword: this.state.input.oldPassword,
        newPassword: this.state.input.newPassword,
        confirmPassword: this.state.input.confirmPassword,
      };
      console.log(data);

      ServerService.changePassword(data)
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    }
  };

  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (
      typeof input["newPassword"] !== undefined &&
      typeof input["confirmPassword"] !== undefined
    ) {
      if (input["newPassword"] !== input["confirmPassword"]) {
        isValid = false;
        errors["confirmpw"] = "Passwords don't match!";
      }
      if (input["newPassword"].length < 6) {
        isValid = false;
        errors["passwordlen"] = "Password must be of minimum 6 characters!";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  };

  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>
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
              <div className="text-danger">{this.state.errors.passwordlen}</div>
            </Form.Group>
            <Form.Group>
              <Form.Label> New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter New Password"
                name="confirmPassword"
                onChange={this.handleChange}
              />
              <div className="text-danger">{this.state.errors.confirmpw}</div>
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
