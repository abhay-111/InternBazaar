import React, { Component } from "react";
import { Row, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Internships.css";
class InternshipCard extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className={classes.Row}>
          <Card className={classes.shadow}>
            <Card.Body>
              <Card.Title> {this.props.title} </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {" "}
                {this.props.companyName}{" "}
              </Card.Subtitle>
              <Card.Text>{this.props.description}</Card.Text>
              <Table responsive="md" className={classes.table}>
                <tbody>
                  <tr className={classes.heading}>
                    <td>Location</td>
                    <td>START DATE</td>
                    <td>DURATION</td>
                    <td>STIPEND</td>
                    <td>APPLY BY</td>
                  </tr>
                  <tr>
                    <td>{this.props.location}</td>
                    <td> {this.props.startDate} </td>
                    <td> {this.props.internshipPeriod} </td>
                    <td> {this.props.stipend} </td>
                    <td> {this.props.applyBy} </td>
                  </tr>
                </tbody>
              </Table>
              <Link
                to={{
                  pathname: "/internshipdetails",
                  state: {
                    internshipId: this.props.id,
                  },
                }}
              >
                View Details
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}

export default InternshipCard;
