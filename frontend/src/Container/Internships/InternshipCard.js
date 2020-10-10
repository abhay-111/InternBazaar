import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";
import { Row, Card, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import classes from "./Internships.css";
import ServerService from "../../Services/ServerService";

class InternshipCard extends Component {
  applyLater = () => {};

  ratingChanged = (newRating) => {
    const data = {
      internshipId: this.props.id,
      rating: newRating,
      userId: localStorage.getItem("userId"),
    };
    console.log(data);

    ServerService.sendRatings(data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let ratings;
    if (localStorage.getItem("userType") === "student") {
      ratings = (
        <span>
          <ReactStars
            count={5}
            onChange={this.ratingChanged}
            isHalf={true}
            size={24}
            activeColor="#0388fc"
          />
        </span>
      );
    }

    return (
      <React.Fragment>
        <Row className={classes.Row}>
          <Card className={classes.internshipCard}>
            <Card.Body>
              <Card.Title>
                {" "}
                {this.props.title}{" "}
                <span>
                  <ReactStars
                    count={this.props.avgrating}
                    isHalf={true}
                    size={16}
                    edit={false}
                    color="#fcf91c"
                  />{" "}
                </span>{" "}
              </Card.Title>{" "}
              <Card.Subtitle className="mb-2 text-muted">
                {" "}
                {this.props.companyName}{" "}
              </Card.Subtitle>
              <Card.Text>{this.props.description}</Card.Text>
              <Table responsive="lg" className={classes.table}>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                {ratings}
              </div>
            </Card.Body>
          </Card>
        </Row>
      </React.Fragment>
    );
  }
}

export default InternshipCard;
