import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Modal from "../UIelements/Modal/Modal";
import classes from "./Forms.css";
import ServerService from "../../Services/ServerService";

class StudentLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      input: { email: "", password: "" },
      errors: {},
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
    localStorage.setItem("userType", "student");
    if (this.validate()) {
      const data = {
        email: this.state.input.email,
        password: this.state.input.password,
      };
      ServerService.studentLogin(data)
        .then((response) => {
          console.log(response);
          const status = response.status;
          if (status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            this.setState({ redirect: "/student" });
          }
        })
        .catch((error) => {
          const response = error.response;
          console.log(error);
          console.log(response.status);

          console.log(error.response);

          if (response.status === 403) {
            localStorage.setItem("id", response.data.data.id);
            this.setState({ redirect: "/verifyotp" });
          } else {
            this.errorHandler(response.data);
          }
        });
    }
  };
  // fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((res) => {
  //     console.log("status=" + res.status);
  //
  //     if (res.status === 200) {
  //       //localStorage.setItem("token", "abcd");
  //       this.setState({ redirect: "/" });
  //     } else if (res.status === 404) {
  //       const response = res.json();
  //       console.log(response);
  //       this.setState({ redirect: "/verifyotp" });
  //     } else {
  //       this.errorHandler();
  //     }
  //     return res.json();
  //   })
  //   .catch((error) => console.error("Error:", error))
  //   .then((response) => {
  //     console.log(response.data.id);
  //     if (response.data.id !== undefined) {
  //       localStorage.setItem("id", response.data.id);
  //       this.setState({ redirect: "/verifyotp" });
  //     }
  //     localStorage.setItem("token", response.token);
  //     console.log("Success:", response);
  //   });
  // }

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

      this.setState({
        errors: errors,
      });

      return isValid;
    }
  };

  errorHandler = (response) => {
    let errors = {};
    errors["error"] = response.data.msg;

    this.setState({
      errors: errors,
    });
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
              <h2>Welcome Back Student!</h2>
              <p>
                Login to gain access to hundreds of opportunities waiting for
                you!
              </p>
            </Col>
            <Col xs={12} md={7} className={classes.item3}>
              <Form onSubmit={this.handleSubmit} className={classes.loginForm}>
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
                  <div className="text-danger">{this.state.errors.msg}</div>
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
                  <span>
                    <Link
                      to={{
                        pathname: "/forgotpassword",
                        state: {
                          userType: "student",
                        },
                      }}
                    >
                      Forgot Password?
                    </Link>
                  </span>
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
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }
}

export default StudentLoginForm;
