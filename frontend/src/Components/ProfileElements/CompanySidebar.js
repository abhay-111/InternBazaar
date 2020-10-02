import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./ProfileElements.css";
import lists from "../../assets/list.svg";
import group from "../../assets/group.svg";
import checklists from "../../assets/checklists.svg";
import post from "../../assets/post.svg";
import user from "../../assets/user.svg";

class CompanySidebar extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Link to="/employer/password">
            <div className={classes.link}>
              <img src={user} className={classes.icon} alt="" />
              <span className={classes.heading}>CHANGE PASSWORD</span>
            </div>
          </Link>
          <Link to="/employer/details">
            <div className={classes.link}>
              <img src={group} className={classes.icon} alt="" />
              <span className={classes.heading}>ORGANIZATION DEAILS</span>
            </div>
          </Link>
          <Link to="/employer/edit">
            <div className={classes.link}>
              <img src={checklists} className={classes.icon} alt="" />
              <span className={classes.heading}>EDIT DETAILS</span>
            </div>
          </Link>
          <Link to="/employer/posted">
            <div className={classes.link}>
              <img src={lists} className={classes.icon} alt="" />
              <span className={classes.heading}>POSTED INTERNSHIPS</span>
            </div>
          </Link>
          <Link to="/employer/post">
            <div className={classes.link}>
              <img src={post} className={classes.icon} alt="" />
              <span className={classes.heading}>POST NEW INTERNSHIP</span>
            </div>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default CompanySidebar;
