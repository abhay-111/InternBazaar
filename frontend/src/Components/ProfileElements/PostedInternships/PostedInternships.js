import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

import classes from "./PostedInternships.css";

class PostedInternships extends Component {
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
            MY APPLICATIONS
          </Card.Title>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Internships</th>
                <th>No. of Applicants</th>
                <th>Applicant Details</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
export default PostedInternships;
