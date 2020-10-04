import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        </tr>
      </React.Fragment>
    );
  }
}

export default PostedInternshipRow;
