import React, { Component } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Route } from "react-router-dom";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import classes from "./Internships.css";
import InternshipCard from "./InternshipcCard";
import CategoryList from "./CategoryList";
import InternshipDetails from "./InternshipDetails";

class Internships extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col xs={4}>
                <CategoryList />
              </Col>

              <Col xs={8}>
                <InternshipCard />
                <InternshipCard />
                <InternshipCard />
                <InternshipCard />
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Internships;
