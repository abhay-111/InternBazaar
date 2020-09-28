import React, { Component } from "react";
import classes from "./Navbar.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

class LoggedoutNavBar extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     redirect: null,
  //   };
  // }

  logoutHandler = () => {
    localStorage.clear();
    //this.setState({ redirect: "/" });
    window.location.reload();
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }

    let token = localStorage.getItem("token");
    let Auth = false;
    if (token !== null) Auth = true;

    if (Auth) {
      return (
        <Navbar
          collapseOnSelect
          expand="md"
          bg="white"
          sticky="top"
          className={classes.Navbar}
        >
          <Navbar.Brand>
            <Link to="/" className={classes.Logo}>
              InternBazaar
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Link
                href="/"
                className={classes.Navlink}
                onClick={this.logoutHandler}
              >
                Logout
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar
          collapseOnSelect
          expand="md"
          bg="white"
          sticky="top"
          className={classes.Navbar}
        >
          <Navbar.Brand>
            <Link to="/" className={classes.Logo}>
              InternBazaar
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Link to="/login" className={classes.Navlink}>
                Login
              </Link>
              <Link to="/signup" className={classes.Navlink}>
                Signup
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default LoggedoutNavBar;
