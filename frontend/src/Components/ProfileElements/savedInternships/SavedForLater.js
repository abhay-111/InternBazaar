import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import uuid from "react-uuid";

import classes from "../ProfileElements.css";

class SavedForLater extends Component {
  state = {
    data: [],
  };

  componentDidMount() {}

  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>
            SAVED FOR LATER
          </Card.Title>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Company</th>
                <th>Profile</th>
                <th>Application Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default SavedForLater;
