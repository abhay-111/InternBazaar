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
          <Link to="#">
            <div className={classes.link}>
              <img src={user} className={classes.icon} alt="" />
              <span class={classes.heading}>EDIT E-MAIL/PASSWORD</span>
            </div>
          </Link>
          <Link to="#">
            <div className={classes.link}>
              <img src={lists} className={classes.icon} alt="" />
              <span class={classes.heading}>VIEW RESUME</span>
            </div>
          </Link>
          <Link to="#">
            <div className={classes.link}>
              <img src={checklists} className={classes.icon} alt="" />
              <span class={classes.heading}>EDIT RESUME</span>
            </div>
          </Link>
          <Link to="#">
            <div className={classes.link}>
              <img src={files} className={classes.icon} alt="" />
              <span class={classes.heading}>MY APPLICATIONS</span>
            </div>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default StudentSidebar;