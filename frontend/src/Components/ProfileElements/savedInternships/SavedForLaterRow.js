import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ServerService from "../../../Services/ServerService";

class SavedForLaterRow extends Component {
  deleteHandler = () => {
    let request = {
      internshipId: this.props.internshipId,
      userId: localStorage.getItem("userId"),
    };
    ServerService.deleteBookmark(request)
      .then((response) => {
        //console.log(response);
        alert("Internship deleted!");
      })
      .catch((err) => {
        //console.log(err.response);
        alert("Something went wrong!");
      });
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td> {this.props.title} </td>

          <td>
            <Link
              to={{
                pathname: "/internshipdetails",
                state: {
                  internshipId: this.props.internshipId,
                },
              }}
            >
              View
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

export default SavedForLaterRow;
