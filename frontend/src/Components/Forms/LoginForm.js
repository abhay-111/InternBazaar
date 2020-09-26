import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "../UIelements/Modal/Modal";
import classes from "./Forms.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { input: { email: "", password: "" }, errors: {} };
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
    const url = "http://localhost:8080/auth/login";
    const data = {
      email: this.state.input.email,
      password: this.state.input.password,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log("status=" + res.status);

        if (res.status === 200) {
          alert("you have successfully logged in!");
          return res.json();
        } else this.errorHandler();
      })
      .then((response) => {
        localStorage.setItem("token", response.token);
        console.log("Success:", response);
      })
      .catch((error) => console.error("Error:", error));
  };

  errorHandler = () => {
    let errors = {};
    errors["error"] = " Wrong email or password!";

    this.setState({
      errors: errors,
    });
  };

  render() {
    return (
      <Modal show={true}>
        <div className={classes.gridContainer}>
          <div className={classes.item1}>
            <h2>Welcome Back!</h2>
            <p>
              Login to gain access to hundreds of opportunities waiting for you!
            </p>
          </div>
          <div className={classes.item2}></div>
          <div className={classes.item3}>
            <Form onSubmit={this.handleSubmit}>
              <div className="text-danger">{this.state.errors.error}</div>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.handleChange}
                  required
                  className={classes.shadow}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={this.handleChange}
                  required
                  className={classes.shadow}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className={classes.Button}
              >
                Login
              </Button>
              <p>
                Don't have an account? <Link to="/signup">Sign up!</Link>
              </p>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default LoginForm;
