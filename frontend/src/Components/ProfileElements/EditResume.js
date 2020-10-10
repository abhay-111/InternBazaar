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
        about: "",
        location: "",
        education: "",
        skills: "",
        jobs: "",
        links: "",
        additional: "",
      },
      image: "",
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
  onImageChange = (event) => {
    //console.log(event.target.files[0]);

    this.setState({
      image: event.target.files[0],
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state.image);

    const data = {
      name: this.state.data.name,
      email: this.state.data.email,
      phone: this.state.input.phone || this.state.data.phone,
      about: this.state.input.about || this.state.data.about,
      location: this.state.input.location || this.state.data.phone,
      education: this.state.input.education || this.state.data.education,
      skills: this.state.input.skills || this.state.data.skills,
      jobs: this.state.input.jobs || this.state.data.jobs,
      links: this.state.input.links || this.state.data.links,
      additional: this.state.input.additional || this.state.data.additional,
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      image: this.state.image,
    };

    const fd = new FormData();

    for (let formElement in data) {
      fd.append(formElement, data[formElement]);
      console.log(formElement, data[formElement]);
    }
    //console.log(fd.get("image"));
    // console.log(fd.get("phone"));
    ServerService.editProfile(fd)
      .then((response) => {
        console.log(response);
        alert("resume updated");
        // window.location.reload();
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
          <Card.Title className={classes.cardHeading}>EDIT RESUME</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                disabled
                defaultValue={this.state.data.name}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter E-mail"
                name="email"
                disabled
                defaultValue={this.state.data.email}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Contact No."
                required
                name="phone"
                defaultValue={this.state.data.phone}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>About Me</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="about"
                defaultValue={this.state.data.about}
                placeholder="Type something about yourself"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Preferred Locations</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your preferred locations"
                name="location"
                defaultValue={this.state.data.location}
                required
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
                required
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
                required
                defaultValue={this.state.data.skills}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="jobs"
                placeholder="Enter your previos Jobs/Internships"
                required
                defaultValue={this.state.data.jobs}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Links</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="links"
                placeholder="Enter your Github, linkedin or any other profile links"
                required
                defaultValue={this.state.data.links}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Additional Details</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="additional"
                defaultValue={this.state.data.additional}
                required
                placeholder="Any additional details you wish to provide"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                name="file"
                alt="image"
                onChange={this.onImageChange}
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
