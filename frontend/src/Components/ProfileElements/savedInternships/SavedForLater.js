import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import uuid from "react-uuid";
import ServerService from "../../../Services/ServerService";
import SavedForLaterRow from "./SavedForLaterRow";
import classes from "../ProfileElements.css";

class SavedForLater extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const request = {
      userId: localStorage.getItem("userId"),
    };

    ServerService.getSavedInternships(request)
      .then((response) => {
        console.log(response);
        this.setState({ data: response.data.data });
      })
      .catch((err) => {
        //console.log(err.response);
        alert("Something went wrong!");
      });
  }

  render() {
    const internships = this.state.data.map((data) => {
      return (
        <SavedForLaterRow
          key={uuid()}
          title={data.title}
          internshipId={data.internshipId}
        />
      );
    });

    return (
      <Card className={classes.card}>
        <Card.Body>
          <Card.Title className={classes.cardHeading}>
            SAVED FOR LATER
          </Card.Title>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>Internship Name</th>

                <th>View Details</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{internships}</tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default SavedForLater;
