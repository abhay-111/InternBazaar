import React, { Component } from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import classes from "./ProfilePage.css";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import ProfileName from "../../Components/ProfileElements/ProfileName";
import CompanySidebar from "../../Components/ProfileElements/CompanySidebar";
import EditDetails from "../../Components/ProfileElements/EditOrganizationDetails";
import PostInternship from "../../Components/ProfileElements/PostInternship";

class CompanyProfilePage extends Component {
  render() {
    return (
      <BrowserRouter>
        <section className={classes.body}>
          <Navbar />
          <Container className={classes.container}>
            <Row>
              <Col xs={4}>
                <ProfileName />
                <CompanySidebar />
              </Col>

              <Col xs={8}>
                <Switch>
                  <Route path="/employer/edit" exact component={EditDetails} />
                  <Route
                    path="/employer/post"
                    exact
                    component={PostInternship}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}

export default CompanyProfilePage;
