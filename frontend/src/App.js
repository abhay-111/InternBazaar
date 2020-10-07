import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./Container/LandingPage/LandingPage";
import StudentLoginForm from "./Components/Forms/StudentLoginForm";
import CompanyLoginForm from "./Components/Forms/CompanyLoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import OtpPage from "./Components/Forms/otp";
import ForgotPassword from "./Components/Forms/ForgotPassword";
import NewPassword from "./Components/Forms/NewPassword";
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
          <Route path="/resetpassword/:token" exact component={NewPassword} />
          <Route path="/employer" component={CompanyProfilePage} />
          <Route path="/student" component={StudentProfilePage} />
          <Route path="/" component={LandingPage} />
        </Switch>

        <Route path="/studentlogin" exact component={StudentLoginForm} />
        <Route path="/employerlogin" exact component={CompanyLoginForm} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/verifyotp" exact component={OtpPage} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
      </div>
    );
  }
}

export default App;
