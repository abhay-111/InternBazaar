import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";

import classes from "./PostedInternships.css";
import ApplicantsRow from "./ApplicantsRow";
import ServerService from "../../../Services/ServerService";
import uuid from "react-uuid";

class Applicants extends Component {
  state = {
    applicants: [],
  };

  componentDidMount() {
    const internshipId = {
      internshipId: this.props.history.location.state.internshipId,
    };
    ServerService.getApplicants(internshipId)
      .then((response) => {
        console.log(response);
        this.setState({ applicants: response.data.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const applicants = this.state.applicants.map((data) => {
      return (
        <ApplicantsRow
          key={uuid()}
          applicantName={data.userId.name}
          status={data.status}
          resume={"http://localhost:8080/" + data.userId.resume}
          internshipId={this.props.history.location.state.internshipId}
          userId={data.userId._id}
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
            APPLICANT DETAILS
          </Card.Title>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th> Resume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{applicants}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
export default Applicants;
