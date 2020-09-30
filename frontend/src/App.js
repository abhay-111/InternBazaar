import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./Container/LandingPage/LandingPage";
import LoginForm from "./Components/Forms/LoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import OtpPage from "./Components/Forms/otp";
import InternshipsByCategory from "./Container/Internships/InternshipsByCategory";
import InternshipsByLocation from "./Container/Internships/InternshipsByLocation";
import InternshipDetails from "./Container/Internships/InternshipDetails";
import StudentProfilePage from "./Container/ProfilePage/StudentProfilePage";
import CompanyProfilePage from "./Container/ProfilePage/CompanyProfilePage";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path="/internships/category/:id"
            exact
            component={InternshipsByCategory}
          />
          <Route
            path="/internships/location/:id"
            exact
            component={InternshipsByLocation}
          />
          <Route
            path="/internshipdetails"
            exact
            component={InternshipDetails}
          />
          <Route path="/company" component={CompanyProfilePage} />
          <Route path="/home" component={StudentProfilePage} />
          <Route path="/" component={LandingPage} />
        </Switch>

        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/verifyotp" component={OtpPage} />
      </div>
    );
  }
}

export default App;
