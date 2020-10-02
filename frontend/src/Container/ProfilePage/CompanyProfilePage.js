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
import ServerService from "../../Services/ServerService";
import ChangePassword from "../../Components/ProfileElements/ChangePassword";
import PostedInternships from "../../Components/ProfileElements/PostedInternships/PostedInternships";

class CompanyProfilePage extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    const data = {
      userId: localStorage.getItem("userId"),
      userType: localStorage.getItem("userType"),
    };
    ServerService.viewProfile(data)
      .then((response) => {
        console.log(response);
        this.setState({ user: response.data.user });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <section className={classes.body}>
          <Navbar />
          <Container className={classes.body}>
            <Row>
              <Col xs={4}>
                <ProfileName userName={this.state.user.name} />
                <CompanySidebar />
              </Col>

              <Col xs={8}>
                <Switch>
                  <Route path="/employer/edit" exact component={EditDetails} />
                  <Route
                    path="/employer/password"
                    exact
                    component={ChangePassword}
                  />
                  <Route
                    path="/employer/posted"
                    exact
                    component={PostedInternships}
                  />
                  <Route
                    path="/employer/post"
                    exact
                    component={() => (
                      <PostInternship userName={this.state.user.name} />
                    )}
                    userName={this.state.user.name}
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
