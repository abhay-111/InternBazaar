import React, { Component } from "react";
import classes from "./Navbar.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
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
    window.location.href = "/";
  };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }

    let token = localStorage.getItem("token");
    let Auth = false;
    if (token != null) {
      if (token != "undefined") Auth = true;
    }
    //console.log(typeof token);
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
              <a className={classes.Navlink} onClick={this.logoutHandler}>
                Logout
              </a>
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
              <NavDropdown
                title={<span className={classes.login}>Login</span>}
                id="collasible-nav-dropdown"
                className={classes.Dropdown}
              >
                <NavDropdown.Item href="/studentlogin">
                  As a student
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/employerlogin">
                  As an employer
                </NavDropdown.Item>
              </NavDropdown>

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
