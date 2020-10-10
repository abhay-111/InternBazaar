import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import { Container, Table, Card, Row, Col, Button } from "react-bootstrap";
import classes from "./Internships.css";
import ServerService from "../../Services/ServerService";

class InternshipDetails extends Component {
  state = {
    data: [],
    redirect: null,
  };

  componentDidMount() {
    //console.log(this.props.history.location.state.internshipId);
    var id = this.props.history.location.state.internshipId;
    ServerService.getDetails(id).then((response) => {
      this.setState({ data: response.data.data });
      console.log(response);
    });
  }

  ApplyHandler = () => {
    const internshipId = this.state.data._id;
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const data = {
      internshipId: internshipId,
      userId: userId,
    };
    console.log(data);
    if (token !== null) {
      //console.log(id);
      ServerService.applyNow(data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) alert("applied successfully");
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 422) {
            alert(err.response.data.message);
          }
        });
    } else this.setState({ redirect: "/studentlogin" });
  };

  saveHandler = () => {
    const internshipId = this.state.data._id;
    const userId = localStorage.getItem("userId");
    const data = {
      internshipId: internshipId,
      userId: userId,
    };
    ServerService.saveInternship(data)
      .then((response) => {
        // console.log(response);
        alert("Internship Saved!");
      })
      .catch((err) => {
        console.log(err.response);
        alert("Already Saved!");
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

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

    let applyNow, save;
    if (localStorage.getItem("userType") === "employer") {
      applyNow = null;
      save = null;
    } else {
      applyNow = (
        <Button
          type="button"
          value="Input"
          className={classes.button}
          onClick={this.ApplyHandler}
        >
          Apply Now
        </Button>
      );
      save = (
        <Button variant="outline-info" onClick={this.saveHandler}>
          Save
        </Button>
      );
    }

    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col xs={12}>
                <Card className={classes.shadow}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      {title} <span> {save} </span>{" "}
                    </Card.Title>
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
                    {applyNow}
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
