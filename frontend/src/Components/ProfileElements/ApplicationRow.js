import React, { Component } from "react";

class ApplicationRow extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.companyName}</td>
          <td> {this.props.profile} </td>
          <td> {this.props.status} </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ApplicationRow;
