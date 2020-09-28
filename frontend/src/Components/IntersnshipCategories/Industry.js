import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import partTime from "../../assets/internshipLogos/part_time.svg";
import Engineering from "../../assets/internshipLogos/engineering.svg";
import NGO from "../../assets/internshipLogos/ngo.svg";
import MBA from "../../assets//internshipLogos/mba.svg";
import Design from "../../assets/internshipLogos/design.svg";
import Science from "../../assets/internshipLogos/science.svg";
import Media from "../../assets/internshipLogos/media.svg";
import Humanities from "../../assets/internshipLogos/humanities.svg";
import classes from "./InternshipCategories.css";

class Industry extends Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
    };
  }

  clickHandler = (event) => {
    let name = event.target.name;
    this.setState({ redirect: "/internships/" + name });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <div className={classes.heading}>Internships by industry</div>
        <div className={classes.Container}>
          <div onClick={this.clickHandler}>
            <img src={partTime} alt="" name="part_time" />
            <h6>Part-time</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={Engineering} alt="" name="engineering" />
            <h6>Engineering</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={NGO} alt="" name="ngo" />
            <h6>NGO</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={MBA} alt="" name="mba" />
            <h6>MBA</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={Design} alt="" name="design" />
            <h6>Design</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={Science} alt="" name="science" />
            <h6>Science</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={Media} alt="" name="media" />
            <h6>Media</h6>
          </div>
          <div onClick={this.clickHandler}>
            <img src={Humanities} alt="" name="humanities" />
            <h6>Humanities</h6>
          </div>
        </div>
      </div>
    );
  }
}

export default Industry;
