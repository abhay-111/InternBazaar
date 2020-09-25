import React from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (

    <div>
    <Backdrop showbackdrop={props.show}/>
    <div className={classes.Modal}>
    {props.children}
    </div>
    </div>

   
);

export default modal;