import React, { Component } from "react";
import employerplaceholder from "../../assets/placeholder.jpg";
import studentplaceholder from "../../assets/studentplaceholder.jpg";
import classes from "./ProfileElements.css";

class PlaceholderImage extends Component {
  render() {
    const userType = localStorage.getItem("userType");
    if (userType === "employer") {
      return (
        <img src={employerplaceholder} alt="" className={classes.placeholder} />
      );
    } else {
      return (
        <img src={studentplaceholder} alt="" className={classes.placeholder} />
      );
    }
  }
}

export default PlaceholderImage;
