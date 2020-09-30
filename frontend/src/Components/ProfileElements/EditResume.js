import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";

import classes from "./ProfileElements.css";

class EditResume extends Component {
  constructor() {
    super();
    this.state = {
      input: {},
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
            EDIT RESUME
          </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter E-mail"
                name="email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact No."
                name="contact"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                name="address"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Educational Details</Form.Label>
              <Form.Control as="textarea" rows="3" name="education" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Skills</Form.Label>
              <Form.Control as="textarea" rows="3" name="skills" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Jobs/Internships</Form.Label>
              <Form.Control as="textarea" rows="3" name="experience" />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control as="textarea" rows="3" name="additional" />
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

export default EditResume;
