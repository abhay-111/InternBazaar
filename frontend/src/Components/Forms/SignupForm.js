import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import Modal from "../UIelements/Modal/Modal";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import classes from "./Forms.css";

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        name: "",
        userType: "student",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: { msg: "", passwordlen: "", confirmpw: "" },

      redirect: null,
    };
  }

  handleChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userType", this.state.input.userType);
    if (this.validate()) {
      event.preventDefault();
      const url = "http://localhost:8080/auth/signup";
      const data = {
        name: this.state.input.name,
        userType: this.state.input.userType,
        email: this.state.input.email,
        password: this.state.input.password,
      };
      console.log(data);

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
          console.log("Success:", response);
          if (response.message === "otp sent") {
            localStorage.setItem("id", response.id);
            this.setState({ redirect: "/verifyotp" });
          } else {
            alert("Registration Failed!");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (typeof input["email"] !== undefined) {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["msg"] = "Please enter a valid email address.";
      }
    }

    if (
      typeof input["password"] !== undefined &&
      typeof input["confirmPassword"] !== undefined
    ) {
      if (input["password"] !== input["confirmPassword"]) {
        isValid = false;
        errors["confirmpw"] = "Passwords don't match!";
      }
      if (input["password"].length < 6) {
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
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: this.state.redirect,
            state: {
              email: this.state.input.email,
            },
          }}
        />
      );
    }
    return (
      <Modal show={true}>
        <Container fluid className={classes.Container}>
          <Row>
            <Col md={5} className={classes.SignupItem}>
              <h2>Looks like you're new here!</h2>
              <p>Signup Now to find Your dream internships!</p>
            </Col>
            <Col xs={12} md={7} className={classes.item3}>
              <Form onSubmit={this.handleSubmit} className={classes.signupForm}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Name/Organization Name"
                    name="name"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="userType"
                    required
                    onChange={this.handleChange}
                  >
                    <option>student</option>
                    <option>employer</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="text-danger">{this.state.errors.msg}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password  (minimum 6 characters)"
                    name="password"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="text-danger">
                    {this.state.errors.passwordlen}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-Enter Password"
                    name="confirmPassword"
                    required
                    onChange={this.handleChange}
                  />
                  <div className="text-danger">
                    {this.state.errors.confirmpw}
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={classes.Button}
                >
                  Signup
                </Button>
                <p>
                  Already have an account? <Link to="/login">Login!</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
}

export default SignupForm;
