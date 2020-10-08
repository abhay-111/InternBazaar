import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  render() {
    return (
      <React.Fragment>
        <div className={classes.heading}>Internships by industry</div>
        <div className={classes.Container}>
          <Link to="/internships/category/part_time">
            <div>
              <img src={partTime} alt="" name="part_time" />
              <h6>Part-time</h6>
            </div>
          </Link>
          <Link to="/internships/category/engineering">
            <div>
              <img src={Engineering} alt="" name="engineering" />
              <h6>Engineering</h6>
            </div>
          </Link>
          <Link to="/internships/category/ngo">
            <div>
              <img src={NGO} alt="" name="ngo" />
              <h6>NGO</h6>
            </div>
          </Link>
          <Link to="/internships/category/mba">
            <div>
              <img src={MBA} alt="" name="mba" />
              <h6>MBA</h6>
            </div>
          </Link>
          <Link to="/internships/category/design">
            <div>
              <img src={Design} alt="" name="design" />
              <h6>Design</h6>
            </div>
          </Link>
          <Link to="/internships/category/science">
            <div>
              <img src={Science} alt="" name="science" />
              <h6>Science</h6>
            </div>
          </Link>
          <Link to="/internships/category/media">
            <div>
              <img src={Media} alt="" name="media" />
              <h6>Media</h6>
            </div>
          </Link>
          <Link to="/internships/category/humanities">
            <div>
              <img src={Humanities} alt="" name="humanities" />
              <h6>Humanities</h6>
            </div>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Industry;
