import React, { Component } from "react";
import { Card } from "react-bootstrap";
import classes from "./Internships.css";
import { a } from "react-router-dom";

class CategoryList extends Component {
  render() {
    return (
      <Card className={classes.shadow}>
        <Card.Body>
          <Card.Title>Internships</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Categories</Card.Subtitle>
          <a href="/internships/category/engineering">Engineering</a> <br />
          <a href="/internships/category/design">Design</a> <br />
          <a href="/internships/category/mba">MBA</a> <br />
          <a href="/internships/category/ngo">NGO</a> <br />
          <a href="/internships/category/media">Media</a> <br />
          <a href="/internships/category/science">Science</a> <br />
          <a href="/internships/category/humanities">Humanities</a>
          <br /> <br />
          <Card.Subtitle className="mb-2 text-muted">Location</Card.Subtitle>
          <a href="/internships/location/wfh">Work From Home</a> <br />
          <a href="/internships/location/delhi">Delhi</a> <br />
          <a href="/internships/location/hyderabad">Hyderabad</a> <br />
          <a href="/internships/location/mumbai">Mumbai</a> <br />
          <a href="/internships/location/chennai">Chennai</a> <br />
          <a href="/internships/location/kolkata">Kolkata</a> <br />
          <a href="/internships/location/international">International</a> <br />
        </Card.Body>
      </Card>
    );
  }
}

export default CategoryList;
