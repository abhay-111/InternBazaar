import React, { Component } from 'react';
import classes from './Navbar.css'; 
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoggedoutNavBar extends Component{

 
    
  

    render() {
      let token= localStorage.getItem('token');
      let Auth= false;
      if(token!==null)
      Auth=true;
      
      if(Auth) {
        return(

          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <Navbar.Brand href="/"><span className={classes.Logo}>InternBazaar</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
               <Nav>
               <Link to='/'><span className={classes.Navlink} onClick={localStorage.clear()} >Logout</span></Link>
             </Nav> 
            </Navbar.Collapse>
          </Navbar>
                  );
      }
      else{
        return(

          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top">
            <Navbar.Brand href="/"><span className={classes.Logo}>InternBazaar</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
               <Nav>
               <Link to="/login"><span className={classes.Navlink}  >Login</span></Link>
               <Link to="/signup"><span className={classes.Navlink} >Signup</span></Link>
             </Nav> 
            </Navbar.Collapse>
          </Navbar>
                  );
      }
       
    }
}

export default LoggedoutNavBar;