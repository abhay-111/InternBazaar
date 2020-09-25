import React, { Component } from 'react';
import WFH from '../../assets/internshipLogos/wfh.svg';
import NCR from '../../assets/internshipLogos/delhi_ncr.svg';
import Bangalore from '../../assets/internshipLogos/bangalore.svg';
import Mumbai from '../../assets//internshipLogos/mumbai.svg';
import Hyderabad from '../../assets/internshipLogos/hyderabad.svg';
import Chennai from '../../assets/internshipLogos/chennai.svg';
import Kolkata from '../../assets/internshipLogos/kolkata.svg';
import International from '../../assets/internshipLogos/international.svg';
import classes from './InternshipCategories.css';

class Location extends Component {

    render() {
        return(
            <div>
                <div className={classes.heading}>Internships by location</div>
                <div className={classes.Container}>
                <div>
                    <img src={WFH} alt=""/>
                    <h6>Work from home</h6>
                </div>
                <div>
                <img src={NCR} alt=""/>
                    <h6>Delhi/NCR</h6>
                </div>
                <div>
                <img src={Bangalore} alt="" />
                    <h6>Bangalore</h6>
                </div>
                <div>
                <img src={Mumbai} alt="" />
                <h6>Mumbai</h6>
                </div>
                <div>
                 <img src={Hyderabad} alt="" />
                    <h6>Hyderabad</h6>
                </div>
                <div>
                <img src={Chennai} alt=""/>
                    <h6>Chennai</h6>
                </div>
                <div>
                <img src={Kolkata} alt="" />
                    <h6>Kolkata</h6>
                </div>
                <div>
                <img src={International} alt="" />
                    <h6>International</h6>
                </div>


                
                </div>
            </div>
            
        );
    }
}

export default Location;