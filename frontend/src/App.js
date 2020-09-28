import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./Container/LandingPage/LandingPage";
import LoginForm from "./Components/Forms/LoginForm";
import SignupForm from "./Components/Forms/SignupForm";
import OtpPage from "./Components/Forms/otp";
import Internships from "./Container/Internships/Internships";
import InternshipDetails from "./Container/Internships/InternshipDetails";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/internships/:id" exact component={Internships} />
          <Route
            path="/internshipdetails"
            exact
            component={InternshipDetails}
          />
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
