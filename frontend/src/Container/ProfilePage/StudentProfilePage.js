import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import classes from "./ProfilePage.css";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import ProfileName from "../../Components/ProfileElements/ProfileName";
import Sidebar from "../../Components/ProfileElements/StudentSidebar";
import EditResume from "../../Components/ProfileElements/EditResume";

class ProfilePage extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className={classes.body}>
          <Navbar />
          <Container className={classes.body}>
            <Row>
              <Col xs={4}>
                <ProfileName />
                <Sidebar />
              </Col>

              <Col xs={8}>
                <EditResume />
              </Col>
            </Row>
          </Container>
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}

export default ProfilePage;
