import React, { Component } from "react";

import NavigationBar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import classes from "./LandingPage.css";
import Industry from "../../Components/IntersnshipCategories/Industry";
import Location from "../../Components/IntersnshipCategories/Location";
import { Row, Col, Container } from "react-bootstrap";

class LandingPage extends Component {
  render() {
    return (
      <section>
        <NavigationBar />
        <Container fluid className={classes.SearchSpace}>
          <Row>
            <Col>
              <span className={classes.heading}>
                FIND THE BEST WINTER &amp; SUMMER INTERNSHIPS FOR STUDENTS
              </span>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Location />
          <Industry />
        </Container>

        <Footer />
      </section>
    );
  }
}

export default LandingPage;
