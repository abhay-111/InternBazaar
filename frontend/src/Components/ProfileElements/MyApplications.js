import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

import ApplicationRow from "./ApplicationRow";
import classes from "./ProfileElements.css";

class MyApplications extends Component {
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
                <th>Company</th>
                <th>Profile</th>
                <th>Applied On</th>
                <th>No. of Applicants</th>
                <th>Application Status</th>
              </tr>
            </thead>
            <tbody>
              <ApplicationRow />
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default MyApplications;
