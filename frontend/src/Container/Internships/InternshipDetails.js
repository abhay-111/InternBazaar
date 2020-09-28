import React, { Component } from "react";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import { Container, Table, Card, Row, Col, Button } from "react-bootstrap";
import classes from "./Internships.css";
import ServerService from "../../ServerService";

class InternshipDetails extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    //console.log(this.props.history.location.state.internshipId);
    let id = this.props.history.location.state.internshipId;
    ServerService.getDetails(id).then((response) => {
      this.setState({ data: response.data.data });
      console.log(response);
    });
  }

  render() {
    const applyBy = this.state.data.applyBy;
    const companyName = this.state.data.companyName;
    const description = this.state.data.description;
    const internshipPeriod = this.state.data.internshipPeriod;
    const internshipType = this.state.data.internshipType;
    const location = this.state.data.location;
    const skillsReq = this.state.data.skillsReq;
    const startDate = this.state.data.startDate;
    const stipend = this.state.data.stipend;
    const title = this.state.data.title;
    const whoCanApply = this.state.data.whocanApply;
    const Perks = this.state.data.perks;
    const vacancy = this.state.data.vacancy;

    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col xs={12}>
                <Card className={classes.shadow}>
                  <Card.Body>
                    <Card.Title> {title} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {companyName}
                    </Card.Subtitle>
                    <p>{internshipType}</p>
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
                          <td> {location} </td>
                          <td> {startDate} </td>
                          <td> {internshipPeriod} </td>
                          <td> {stipend} </td>
                          <td> {applyBy} </td>
                        </tr>
                      </tbody>
                    </Table>
                    <hr />
                    <Card.Title>About {companyName}</Card.Title>
                    <p>about the company</p>
                    <Card.Title>About Internship</Card.Title>
                    <p> {description} </p>
                    <Card.Title>Skills Required</Card.Title>
                    <p> {skillsReq} </p>
                    <Card.Title>Who can apply</Card.Title>
                    <p> {whoCanApply} </p>
                    <Card.Title>Perks</Card.Title>
                    <p> {Perks} </p>
                    <Card.Title> No. of openings </Card.Title>
                    <p>{vacancy}</p>

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
