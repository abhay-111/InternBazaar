import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Modal from "../UIelements/Modal/Modal";
import classes from "./Forms.css";
import ServerService from "../../Services/ServerService";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      input: { email: "" },
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
    if (this.validate()) {
      const data = {
        email: this.state.input.email,
        userType: this.props.location.state.userType,
      };
      //console.log(data);

      ServerService.forgotPassword(data)
        .then((response) => {
          // console.log(response);
          alert(response.data.message);
        })
        .catch((err) => {
          //console.log(err.response);
          alert(err.response.data.data.msg);
        });
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

      this.setState({
        errors: errors,
      });

      return isValid;
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Modal show={true}>
        <div className={classes.gridContainer}>
          <div className={classes.item1}>
            <h2>Forgot Password!</h2>
            <p>We will send a link to your Email</p>
          </div>
          <div className={classes.item2}></div>
          <div className={classes.item3}>
            <Form onSubmit={this.handleSubmit} className={classes.loginForm}>
              <Form.Group>
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

              <Button
                variant="primary"
                type="submit"
                className={classes.Button}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ForgotPassword;
