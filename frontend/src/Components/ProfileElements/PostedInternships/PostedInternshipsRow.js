import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ServerService from "../../../Services/ServerService";

class PostedInternshipRow extends Component {
  deleteHandler = () => {
    let internshipId = {
      internshipId: this.props.internshipId,
    };
    ServerService.deleteInternship(internshipId)
      .then((response) => {
        console.log(response);
        alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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
            <Button onClick={this.deleteHandler} variant="outline-danger">
              Delete
            </Button>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PostedInternshipRow;
