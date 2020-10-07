import React, { Component } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import ServerService from "../../Services/ServerService";

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
            this.setState({ redirect: "/employer/edit" });
          } else {
            this.setState({ redirect: "/student/edit" });
          }
        } else alert("registration failed!");
      });
  };

  otpResend = () => {
    // console.log(this.props);
    const data = {
      email: this.props.location.state.email,
      userType: localStorage.getItem("userType"),
    };
    ServerService.resendOtp(data)
      .then((response) => {
        // console.log(response);
        alert(response.data.message);
        localStorage.setItem("id", response.data.id);
      })
      .catch((err) => {
        // console.log(err.response);
        alert("sorry, something went wrong!");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Modal show={true}>
        <Container fluid className={classes.Container}>
          <Row>
            <Col md={5} className={classes.item1}>
              <h2>Verify Yourself!</h2>
              <p>An OTP has been sent to your E-mail for verification!</p>
            </Col>
            <Col xs={12} md={7} className={classes.item3}>
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
                <div style={{ marginTop: "10%" }}>
                  Didn't receive OTP?{" "}
                  <Link to="#" onClick={this.otpResend}>
                    {" "}
                    Resend OTP!{" "}
                  </Link>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
}

export default OtpPage;
