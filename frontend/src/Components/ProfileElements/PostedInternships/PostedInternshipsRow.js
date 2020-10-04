import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class PostedInternshipRow extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
          <td> {this.props.internshipName} </td>

          <td>
            <Link
              to={{
                pathname: "/employer/applicants",
                state: {
                  internshipId: this.props.internshipId,
                },
              }}
            >
              View
            </Link>
          </td>
          <td>
            <Link
              to={{
                pathname: "/employer/editinternship",
                state: {
                  internshipId: this.props.internshipId,
                },
              }}
            >
              Edit
            </Link>
          </td>
          <td>
            <Button variant="outline-danger">Delete</Button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PostedInternshipRow;
