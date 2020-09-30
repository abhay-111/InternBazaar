import React, { Component } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

import classes from "./ProfileElements.css";

class PostInternship extends Component {
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
            POST INTERNSHIP
          </Card.Title>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Primary Profile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your internship profile"
                name="profile"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Internship Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type your internship description"
                rows="4"
                name="description"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type what type of skills are required for the internship"
                rows="3"
                name="skills"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Who can apply</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type who can apply for your internship"
                rows="3"
                name="whoCanApply"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Perks</Form.Label>
              <Form.Control
                placeholder="Type the benefits of completing your internship"
                rows="3"
                as="textarea"
                name="perks"
              />
            </Form.Group>

            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>No. of openings</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="type no. of openings"
                    name="vacancy"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="dd/mm/yyyy"
                    name="startDate"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Duration of internship"
                    name="duration"
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Apply by</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="dd/mm/yyyy"
                    name="applyBy"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="city" name="city" />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default PostInternship;
