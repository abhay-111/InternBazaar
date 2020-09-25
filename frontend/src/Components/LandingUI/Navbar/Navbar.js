import React, { Component } from 'react';
import classes from './Navbar.css'; 
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class NavigationBar extends Component{


    render() {
        return(

<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="/"><span className={classes.Logo}>InternBazaar</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="mr-auto"></Nav>
  <Nav>
    < Link to="/login"><span className={classes.Navlink}  >Login</span></Link>
    <Link to="/signup"><span className={classes.Navlink} >Signup</span></Link>
  </Nav>
  </Navbar.Collapse>
</Navbar>
        );
    }
}

export default NavigationBar;