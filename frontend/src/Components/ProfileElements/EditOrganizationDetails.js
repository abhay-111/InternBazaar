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
        email: "",
        about: "",
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
    const data = {
      name: this.state.input.name || this.state.data.name,
      email: this.state.input.email || this.state.data.email,
      about: this.state.input.about || this.state.data.about,
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
      image: this.state.image,
    };

    const fd = new FormData();

    for (let formElement in data) {
      fd.append(formElement, data[formElement]);
    }

    ServerService.editProfile(fd)
      .then((response) => {
        console.log(response);
        if (response.status === 200) alert("Organization Details Updated!");
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
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>EDIT DETAILS</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the name of your organization"
                defaultValue={this.state.data.name}
                name="name"
                required
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                defaultValue={this.state.data.email}
                disabled
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Organization Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Enter the description of your organization"
                defaultValue={this.state.data.about}
                required
                name="about"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Logo</Form.Label>
              <Form.Control
                type="file"
                name="files"
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

export default EditDetails;
