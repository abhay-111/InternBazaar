import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        name: "",
        about: "",
      },
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
    const data = {
      name: this.state.input.name,
      about: this.state.input.about,
    };
    const request = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      data: data,
    };
    ServerService.editProfile(request)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
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
            EDIT ORGANIZATION DETAILS
          </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your organization"
                name="name"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Organization Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter the description of your organization"
                name="about"
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

export default EditDetails;
