import React, { Component } from "react";
import { Link } from "react-router-dom";

import WFH from "../../assets/internshipLogos/wfh.svg";
import NCR from "../../assets/internshipLogos/delhi_ncr.svg";
import Bangalore from "../../assets/internshipLogos/bangalore.svg";
import Mumbai from "../../assets//internshipLogos/mumbai.svg";
import Hyderabad from "../../assets/internshipLogos/hyderabad.svg";
import Chennai from "../../assets/internshipLogos/chennai.svg";
import Kolkata from "../../assets/internshipLogos/kolkata.svg";
import International from "../../assets/internshipLogos/international.svg";
import classes from "./InternshipCategories.css";

class Location extends Component {
  //constructor() {
  //  super();
  //  this.state = {
  //    redirect: null,
  //  };
  //}

  // clickHandler = (event) => {
  //   //let name = event.target.name;
  //   console.log(event.target);
  //   // if (name !== undefined) {
  //   //   this.setState({ redirect: "/internships/location/" + name });
  //   // }
  // };

  render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />;
    // }
    return (
      <React.Fragment>
        <div className={classes.heading}>Internships by location</div>
        <div className={classes.Container}>
          <Link to="/internships/location/wfh">
            <div>
              <img src={WFH} alt="" name="wfh" />
              <h6>Work from home</h6>
            </div>
          </Link>
          <Link to="/internships/location/delhi">
            <div>
              <img src={NCR} alt="" />
              <h6>Delhi/NCR</h6>
            </div>
          </Link>
          <Link to="/internships/location/bangalore">
            <div>
              <img src={Bangalore} alt="bangalore" />
              <h6>Bangalore</h6>
            </div>
          </Link>
          <Link to="/internships/location/mumbai">
            <div>
              <img src={Mumbai} alt="" name="mumbai" />
              <h6>Mumbai</h6>
            </div>
          </Link>
          <Link to="/internships/location/hyderabad">
            <div>
              <img src={Hyderabad} alt="" name="hyderabad" />
              <h6>Hyderabad</h6>
            </div>
          </Link>
          <Link to="/internships/location/chennai">
            <div>
              <img src={Chennai} alt="" name="chennai" />
              <h6>Chennai</h6>
            </div>
          </Link>
          <Link to="/internships/location/kolkata">
            <div>
              <img src={Kolkata} alt="" />
              <h6>Kolkata</h6>
            </div>
          </Link>
          <Link to="/internships/location/international">
            <div>
              <img src={International} alt="" />
              <h6>International</h6>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Location;
