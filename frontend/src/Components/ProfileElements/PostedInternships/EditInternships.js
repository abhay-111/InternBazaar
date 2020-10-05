import React, { Component } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import ServerService from "../../../Services/ServerService";

import classes from "../ProfileElements.css";

class EditInternship extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
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
      title: this.state.input.title || this.state.data.title,
      startDate: this.state.input.startDate || this.state.data.startDate,
      applyBy: this.state.input.applyBy || this.state.data.applyBy,
      description: this.state.input.description || this.state.data.description,
      whocanApply: this.state.input.whocanApply || this.state.data.whocanApply,
      perks: this.state.input.perks || this.state.data.perks,
      stipend: this.state.input.stipend || this.state.data.stipend,
      internshipPeriod:
        this.state.input.internshipPeriod || this.state.data.internshipPeriod,
      skillsReq: this.state.input.skillsReq || this.state.data.skillsReq,
      location: this.state.input.location || this.state.data.location,
      internshipType:
        this.state.input.internshipType || this.state.data.internshipType,
      vacancy: this.state.input.vacancy || this.state.data.vacancy,
    };
    const request = {
      internshipId: this.props.history.location.state.internshipId,
      data: data,
    };
    console.log(request);

    ServerService.updateInternship(request)
      .then((response) => {
        console.log(response);
        if (response.status === 200) alert("Internship Updated!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.message);
      });
  };

  componentDidMount() {
    const internshipId = this.props.history.location.state.internshipId;

    ServerService.getDetails(internshipId)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

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
            EDIT INTERNSHIP
          </Card.Title>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Internship Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your internship title"
                name="title"
                defaultValue={this.state.data.title}
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
                defaultValue={this.state.data.description}
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
                defaultValue={this.state.data.skillsReq}
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
                defaultValue={this.state.data.whocanApply}
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
                defaultValue={this.state.data.stipend}
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
                defaultValue={this.state.data.perks}
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
                    defaultValue={this.state.data.vacancy}
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
                    defaultValue={this.state.data.startDate}
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
                    defaultValue={this.state.data.internshipPeriod}
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
                    defaultValue={this.state.data.applyBy}
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
                    defaultValue={this.state.data.location}
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
                    defaultValue={this.state.data.internshipType}
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

export default EditInternship;
