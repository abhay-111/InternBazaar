import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

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
import ViewOrganizationDetails from "../../Components/ProfileElements/ViewOrganizationDetails";
import Applicants from "../../Components/ProfileElements/PostedInternships/Applicants";
import EditInternship from "../../Components/ProfileElements/PostedInternships/EditInternships";
import PlaceholderImage from "../../Components/ProfileElements/PlaceholderImage";

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
      <section className={classes.body}>
        <Navbar />
        <Container className={classes.body}>
          <Row>
            <Col md={4} xs={12}>
              <ProfileName
                userName={this.state.user.name}
                imageUrl={this.state.user.imageUrl}
              />
              <CompanySidebar />
            </Col>

            <Col md={8} xs={12}>
              <Switch>
                <Route path="/employer" exact component={PlaceholderImage} />
                <Route path="/employer/edit" exact component={EditDetails} />
                <Route
                  path="/employer/details"
                  exact
                  component={ViewOrganizationDetails}
                />
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
                  path="/employer/applicants"
                  exact
                  component={Applicants}
                />
                <Route
                  path="/employer/editinternship"
                  exact
                  component={EditInternship}
                />
                <Route
                  path="/employer/post"
                  exact
                  component={() => (
                    <PostInternship userName={this.state.user.name} />
                  )}
                />
              </Switch>
            </Col>
          </Row>
        </Container>
        <Footer />
      </section>
    );
  }
}

export default CompanyProfilePage;
