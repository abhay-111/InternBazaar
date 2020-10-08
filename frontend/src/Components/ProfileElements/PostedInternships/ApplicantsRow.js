import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import ServerService from "../../../Services/ServerService";

class ApplicantsRow extends Component {
  state = {
    status: "",
  };

  statusHandler = (event) => {
    console.log(event.target.value);
    this.setState({ status: event.target.value }, () => {
      console.log(this.state.status);
      const data = {
        status: this.state.status,
        userId: this.props.userId,
        internshipId: this.props.internshipId,
      };
      console.log(data);
      ServerService.changeStatus(data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) alert(response.data.message);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };

  resumeOpener = () => {
    window.open(this.props.resume);
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td> {this.props.applicantName} </td>
          <td>
            <Button variant="primary" type="submit" onClick={this.resumeOpener}>
              View
            </Button>
          </td>

          <td>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  defaultValue={this.props.status}
                  onChange={this.statusHandler}
                >
                  <option>Applied</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ApplicantsRow;
