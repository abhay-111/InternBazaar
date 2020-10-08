import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import classes from "./ProfilePage.css";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import ProfileName from "../../Components/ProfileElements/ProfileName";
import Sidebar from "../../Components/ProfileElements/StudentSidebar";
import EditResume from "../../Components/ProfileElements/EditResume";
import MyApplications from "../../Components/ProfileElements/MyApplications";
import ViewResume from "../../Components/ProfileElements/ViewResume";
import ServerService from "../../Services/ServerService";
import ChangePassword from "../../Components/ProfileElements/ChangePassword";
import PlaceholderImage from "../../Components/ProfileElements/PlaceholderImage";

class ProfilePage extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    //const userId = localStorage.getItem("userId");
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
              <Col md={4} xs={12}>
                <ProfileName
                  userName={this.state.user.name}
                  imageUrl={this.state.user.imageUrl}
                />

                <Sidebar />
              </Col>

              <Col md={8} xs={12}>
                <Switch>
                  <Route path="/student" exact component={PlaceholderImage} />
                  <Route
                    path="/student/password"
                    exact
                    component={ChangePassword}
                  />
                  <Route path="/student/edit" exact component={EditResume} />
                  <Route
                    path="/student/view"
                    exact
                    component={() => (
                      <ViewResume path={this.state.user.resume} />
                    )}
                  />
                  <Route
                    path="/student/applications"
                    exact
                    component={MyApplications}
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

export default ProfilePage;
