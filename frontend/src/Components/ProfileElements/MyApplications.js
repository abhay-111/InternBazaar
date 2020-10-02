import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import uuid from "react-uuid";

import ApplicationRow from "./ApplicationRow";
import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class MyApplications extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const id = localStorage.getItem("userId");
    const data = {
      userId: id,
    };
    console.log(data);
    ServerService.myApplications(data)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const rows = this.state.data.map((data) => {
      return (
        <ApplicationRow
          key={uuid()}
          companyName={data.companyName}
          profile={data.internshipProfile}
          status={data.status}
          appliedOn={data.appliedOn}
        />
      );
    });
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
                <th>Application Status</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default MyApplications;
