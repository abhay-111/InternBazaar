import React, { Component } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import ServerService from "../../Services/ServerService";

import classes from "./ProfileElements.css";

class PostInternship extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        title: "",
        startDate: "",
        applyBy: "",
        description: "",
        whocanApply: "",
        perks: "",
        stipend: "",
        internshipPeriod: "",
        skillsReq: "",
        location: "",
        internshipType: "",
        vacancy: "",
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
      ...this.state.input,
      companyName: this.props.userName,
      creatorId: localStorage.getItem("userId"),
    };
    console.log(data);
    ServerService.postInternship(data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) alert("Internship Posted Successfully!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // componentDidMount() {
  //   console.log(this.props.userName)
  // }

  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>
            POST INTERNSHIP
          </Card.Title>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Internship Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your internship title"
                name="title"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Internship Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type your internship description"
                rows="4"
                name="description"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type what type of skills are required for the internship"
                rows="3"
                name="skillsReq"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Who can apply</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Type who can apply for your internship"
                rows="3"
                name="whocanApply"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stipend</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type the stipend of your internship"
                name="stipend"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Perks</Form.Label>
              <Form.Control
                placeholder="Type the benefits of completing your internship"
                rows="3"
                as="textarea"
                name="perks"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Row>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>No. of openings</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="type no. of openings"
                    name="vacancy"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="startDate"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Duration of internship"
                    name="internshipPeriod"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Apply by</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="dd/mm/yyyy"
                    name="applyBy"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="city"
                    name="location"
                    required
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Internship Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Internship type"
                    name="internshipType"
                    required
                    onChange={this.handleChange}
                  />
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
