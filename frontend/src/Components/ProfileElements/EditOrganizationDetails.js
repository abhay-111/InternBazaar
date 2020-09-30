import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";

import classes from "./ProfileElements.css";

class EditDetails extends Component {
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
            EDIT ORGANIZATION DETAILS
          </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your organization"
                name="name"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Organization Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter the description of your organization"
                name="description"
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
