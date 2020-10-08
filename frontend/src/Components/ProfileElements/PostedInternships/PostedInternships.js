import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import uuid from "react-uuid";
import ServerService from "../../../Services/ServerService";

import classes from "./PostedInternships.css";
import PostedInternshipsRow from "./PostedInternshipsRow";

class PostedInternships extends Component {
  state = {
    internships: [],
  };

  componentDidMount() {
    const userId = {
      userId: localStorage.getItem("userId"),
    };

    console.log(userId);
    ServerService.postedInternships(userId)
      .then((res) => {
        console.log(res);
        this.setState({ internships: res.data.internships });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    const internships = this.state.internships.map((data) => {
      return (
        <PostedInternshipsRow
          key={uuid()}
          internshipName={data.title}
          internshipId={data._id}
        />
      );
    });

    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>
            POSTED INTERNSHIPS
          </Card.Title>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Internships</th>
                <th>Applicant Details</th>
                <th>Edit Internship</th>
                <th>Delete Internship</th>
              </tr>
            </thead>
            <tbody>{internships}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
export default PostedInternships;
