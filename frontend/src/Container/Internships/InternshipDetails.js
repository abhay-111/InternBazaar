import React, { Component } from "react";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import { Container, Table, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from "./Internships.css";

class InternshipDetails extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col xs={12}>
                <Card className={classes.shadow}>
                  <Card.Body>
                    <Card.Title>Designing</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Adobe
                    </Card.Subtitle>
                    <p>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
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
                    <hr />
                    <Card.Title>About Adobe</Card.Title>
                    <p>about the company</p>
                    <Card.Title>About Internship</Card.Title>
                    <p>About the Internship</p>
                    <Card.Title>Skills Required</Card.Title>
                    <p>skills required</p>
                    <Card.Title>Who can apply</Card.Title>
                    <p>who can apply</p>
                    <Card.Title>Perks</Card.Title>
                    <p>Perks</p>
                    <Card.Title>No. of openings</Card.Title>
                    <p>5</p>

                    <Button
                      type="button"
                      value="Input"
                      className={classes.button}
                    >
                      Apply Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </React.Fragment>
    );
  }
}

export default InternshipDetails;
