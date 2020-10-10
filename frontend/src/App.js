import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

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
  Auth = (token) => {
    if (token != null) {
      if (token !== "undefined") {
        return true;
      }
    } else return false;
  };

  render() {
    return (
      <BrowserRouter>
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
          <Route
            path="/employer"
            component={() => {
              if (this.Auth(localStorage.getItem("token"))) {
                if (localStorage.getItem("userType") === "employer")
                  return <CompanyProfilePage />;
                else return <Redirect to="/student" />;
              } else {
                return <Redirect to="/employerlogin" />;
              }
            }}
          />
          <Route
            path="/student"
            component={() => {
              if (this.Auth(localStorage.getItem("token"))) {
                if (localStorage.getItem("userType") === "student")
                  return <StudentProfilePage />;
                else return <Redirect to="/employer" />;
              } else {
                return <Redirect to="/studentlogin" />;
              }
            }}
          />
          <Route
            path="/"
            component={() => {
              if (this.Auth(localStorage.getItem("token"))) {
                if (localStorage.getItem("userType") === "student")
                  return <LandingPage />;
                else return <Redirect to="/employer" />;
              } else {
                return <LandingPage />;
              }
            }}
          />
        </Switch>

        <Route path="/studentlogin" exact component={StudentLoginForm} />
        <Route path="/employerlogin" exact component={CompanyLoginForm} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/verifyotp" exact component={OtpPage} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
      </BrowserRouter>
    );
  }
}

export default App;
