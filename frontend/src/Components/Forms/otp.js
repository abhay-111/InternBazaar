import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import Modal from "../UIelements/Modal/Modal";
import classes from "./Forms.css";

class OtpPage extends Component {
  constructor() {
    super();
    this.state = { input: { otp: "" }, redirect: null };
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
    const id = localStorage.getItem("id");
    const userType = localStorage.getItem("userType");

    const url = "http://localhost:8080/auth/signup/otp";
    const data = { otp: this.state.input.otp, id: id };
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
        if (response.message === "password correct, user added") {
          localStorage.setItem("userId", response.userId);
          localStorage.setItem("token", response.token);
          if (userType === "employer") {
            this.setState({ redirect: "/employer" });
          } else {
            this.setState({ redirect: "/student" });
          }
        } else alert("registration failed!");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Modal show={true}>
        <div className={classes.gridContainer}>
          <div className={classes.item1}>
            <h2>Verify Yourself!</h2>
            <p>An OTP has been sent to your E-mail for verification!</p>
          </div>
          <div className={classes.item2}></div>
          <div className={classes.item3}>
            <Form onSubmit={this.handleSubmit} className={classes.loginForm}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  name="otp"
                  placeholder="Enter your OTP here"
                  required
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default OtpPage;
