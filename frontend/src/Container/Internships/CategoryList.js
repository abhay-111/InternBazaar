import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import classes from "./Internships.css";
import { Link } from "react-router-dom";

class CategoryList extends Component {
  render() {
    return (
      <Card className={classes.shadow}>
        <Card.Body>
          <Container fluid>
            <Row>
              <Card.Title>Internships</Card.Title>
            </Row>
            <Row>
              <Col md={12} xs={6}>
                <Card.Subtitle className="mb-2 text-muted">
                  Categories
                </Card.Subtitle>
                <Link to="/internships/category/engineering">Engineering</Link>{" "}
                <br />
                <Link to="/internships/category/design">Design</Link> <br />
                <Link to="/internships/category/mba">MBA</Link> <br />
                <Link to="/internships/category/ngo">NGO</Link> <br />
                <Link to="/internships/category/media">Media</Link> <br />
                <Link to="/internships/category/science">Science</Link> <br />
                <Link to="/internships/category/humanities">
                  Humanities
                </Link>{" "}
                <br /> <br />
              </Col>

              <Col md={12} xs={6}>
                <Card.Subtitle className="mb-2 text-muted">
                  Location
                </Card.Subtitle>
                <Link to="/internships/location/delhi">Delhi</Link> <br />
                <Link to="/internships/location/hyderabad">Hyderabad</Link>{" "}
                <br />
                <Link to="/internships/location/mumbai">Mumbai</Link> <br />
                <Link to="/internships/location/chennai">Chennai</Link> <br />
                <Link to="/internships/location/kolkata">Kolkata</Link> <br />
                <Link to="/internships/location/international">
                  International
                </Link>{" "}
                <br />
                <Link to="/internships/location/bangalore">Bangalore</Link>{" "}
                <br />
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default CategoryList;
