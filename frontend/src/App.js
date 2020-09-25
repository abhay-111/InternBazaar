import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import LandingPage from './Container/LandingPage/LandingPage';
import LoginForm from './Components/Forms/LoginForm';
import SignupForm from './Components/Forms/SignupForm';
import OtpPage from './Components/Forms/otp';

class App extends Component {
  render() {
    return (
      <div>
       <Route path="/" component={LandingPage} />
       <Route path="/login" component={LoginForm} />
       <Route path="/signup" component={SignupForm} />
       <Route path="/signup/verifyotp" component={OtpPage} />
      </div>
    );
  }
}

export default App;
