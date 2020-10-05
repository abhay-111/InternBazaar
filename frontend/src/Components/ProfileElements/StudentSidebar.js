import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import classes from "./ProfileElements.css";
import user from "../../assets/user.svg";
import lists from "../../assets/list.svg";
import checklists from "../../assets/checklists.svg";
import files from "../../assets/files.svg";

class StudentSidebar extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <Card.Body>
          <Link to="/student/password">
            <div className={classes.link}>
              <img src={user} className={classes.icon} alt="" />
              <span className={classes.heading}>CHANGE PASSWORD</span>
            </div>
          </Link>
          <Link to="/student/view">
            <div className={classes.link}>
              <img src={files} className={classes.icon} alt="" />
              <span className={classes.heading}>VIEW RESUME</span>
            </div>
          </Link>
          <Link to="/student/edit">
            <div className={classes.link}>
              <img src={checklists} className={classes.icon} alt="" />
              <span className={classes.heading}>EDIT RESUME</span>
            </div>
          </Link>
          <Link to="/student/applications">
            <div className={classes.link}>
              <img src={lists} className={classes.icon} alt="" />
              <span className={classes.heading}>MY APPLICATIONS</span>
            </div>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default StudentSidebar;
