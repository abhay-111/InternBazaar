import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ServerService from "../../Services/ServerService";
import { Redirect } from "react-router-dom";
import classes from "./Forms.css";

class NewPassword extends Component {
  state = {
    input: {
      newPassword: "",
      confirmPassword: "",
    },
    errors: { passwordlen: "", confirmpw: "" },
    redirect: null,
  };

  //componentDidMount() {
  //  console.log(this.props.match.params.token);
  //}

  submitHandler = (event) => {
    event.preventDefault();
    if (this.validate()) {
      const data = {
        newPassword: this.state.input.newPassword,
        confirmPassword: this.state.input.confirmPassword,
      };
      const token = this.props.match.params.token;
      //console.log(data);
      ServerService.resetPassword(data, token)
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
          this.setState({ redirect: "/" });
        })
        .catch((err) => {
          // console.log(err.response);
          alert("invalid link");
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Container>
        <Row style={{ paddingTop: "10%" }}>
          <Col xs={{ span: 6, offset: 3 }}>
            <div className={classes.border}>
              <div style={{ marginBottom: "1rem" }}>
                <h2>Reset Password</h2>
              </div>
              <Form onSubmit={this.submitHandler}>
                <Form.Group>
                  <Form.Label> New-Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    name="newPassword"
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
                    placeholder="re enter Password"
                    name="confirmPassword"
                    onChange={this.handleChange}
                  />
                  <div className="text-danger">
                    {this.state.errors.confirmpw}
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NewPassword;
