import React, { Component } from "react";
import { Row, Card, Table } from "react-bootstrap";
import { Route, Link } from "react-router-dom";
import classes from "./Internships.css";
class InternshipCard extends Component {
  render() {
    return (
      <React.Fragment>
        <Row className={classes.Row}>
          <Card className={classes.shadow}>
            <Card.Body>
              <Card.Title>Designing</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Adobe</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Table responsive="md" className={classes.table}>
                <tbody>
                  <tr className={classes.heading}>
                    <td>Location</td>
                    <td>START DATE</td>
                    <td>DURATION</td>
                    <td>STIPENED</td>
                    <td>APPLY BY</td>
                  </tr>
                  <tr>
                    <td>Gurgaon</td>
                    <td>Immediately</td>
                    <td>3 months</td>
                    <td>Unpaid</td>
                    <td>8 Nov 20</td>
                  </tr>
                </tbody>
              </Table>
              <Link to="/internshipdetails" className={classes.link}>
                View details
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}

export default InternshipCard;
