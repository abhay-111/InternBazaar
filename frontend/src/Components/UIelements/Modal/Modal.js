import React from "react";
import { Container } from "react-bootstrap";
import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => (
  <React.Fragment>
    <Backdrop showbackdrop={props.show} />
    <Container className={classes.Modal}>{props.children}</Container>
  </React.Fragment>
);

export default modal;
