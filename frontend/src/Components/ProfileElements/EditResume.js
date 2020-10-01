import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class EditResume extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        name: "",
        email: "",
        phone: "",
        address: "",
        education: "",
        skills: "",
        experience: "",
        additional: "",
      },
      redirect: null,
      data: [],
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
      name: this.state.input.name || this.state.data.name,
      email: this.state.input.email || this.state.data.email,
      phone: this.state.input.phone || this.state.data.phone,
      //address: this.state.input.address,
      education: this.state.input.education || this.state.data.education,
      skills: this.state.input.skills || this.state.data.skills,
      //experience: "",
      //additional: "",
    };
    const request = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      data: data,
    };
    console.log(request);
    ServerService.editProfile(request)
      .then((response) => {
        console.log(response);
        this.setState({
          redirect: "/student/view",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  componentDidMount() {
    const data = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
    };
    ServerService.viewProfile(data)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data.user });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
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
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                required
                onChange={this.handleChange}
                defaultValue={this.state.data.name}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter E-mail"
                name="email"
                required
                onChange={this.handleChange}
                defaultValue={this.state.data.email}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact No."
                name="phone"
                defaultValue={this.state.data.phone}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                name="address"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Educational Details</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="education"
                defaultValue={this.state.data.education}
                placeholder="Enter Your Educational Details"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="skills"
                placeholder="Enter your Skills"
                defaultValue={this.state.data.skills}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Jobs/Internships</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="experience"
                placeholder="Enter your previos Jobs/Internships"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="additional"
                placeholder="Any additional details you wish to provide"
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

export default EditResume;
