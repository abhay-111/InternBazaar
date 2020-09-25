import React from 'react';
import { useHistory } from 'react-router-dom';

import classes from './Backdrop.css';


const backdrop = (props) => {
    const history=useHistory();
    
    return(

    props.showbackdrop?<div className={classes.Backdrop} onClick={() => {
        history.replace('/')
   }}></div> : null
);}

export default backdrop;