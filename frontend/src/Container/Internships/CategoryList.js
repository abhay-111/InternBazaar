import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Internships.css";
class CategoryList extends Component {
  render() {
    return (
      <Card className={classes.shadow}>
        <Card.Body>
          <Card.Title>Internships</Card.Title>
          <Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Categories
            </Card.Subtitle>
            <ul className={classes.list}>
              <li>Engineering</li>
              <li>Design</li>
              <li>MBA</li>
              <li>NGO</li>
              <li>Media</li>
              <li>Science</li>
              <li>Humanities</li>
            </ul>
            <Card.Subtitle className="mb-2 text-muted">Location</Card.Subtitle>
            <ul className={classes.list}>
              <li>Delhi</li>
              <li>Hyderabad</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Kolkata</li>
              <li>International</li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CategoryList;
