import React, { Component } from 'react';

import partTime from '../../assets/internshipLogos/part_time.svg';
import Engineering from '../../assets/internshipLogos/engineering.svg';
import NGO from '../../assets/internshipLogos/ngo.svg';
import MBA from '../../assets//internshipLogos/mba.svg';
import Design from '../../assets/internshipLogos/design.svg';
import Science from '../../assets/internshipLogos/science.svg';
import Media from '../../assets/internshipLogos/media.svg';
import Humanities from '../../assets/internshipLogos/humanities.svg';
import classes from './InternshipCategories.css';

class Industry extends Component {

    
    clickHandler=()=> {
        
        }
     
   
    render() {
        return(
            <div>
                <div className={classes.heading}>Internships by industry</div>
                <div className={classes.Container}>
                <div onClick={this.clickHandler}>
                    <img src={partTime} alt=""/>
                    <h6>Part-time</h6>
                </div>
                <div>
                <img src={Engineering} alt=""/>
                    <h6>Engineering</h6>
                </div>
                <div>
                <img src={NGO} alt=""/>
                    <h6>NGO</h6>
                </div>
                <div>
                <img src={MBA} alt=""/>
                <h6>MBA</h6>
                </div>
                <div>
                 <img src={Design} alt=""/>
                    <h6>Design</h6>
                </div>
                <div>
                <img src={Science} alt=""/>
                    <h6>Science</h6>
                </div>
                <div>
                <img src={Media} alt="" />
                    <h6>Media</h6>
                </div>
                <div>
                <img src={Humanities} alt="" />
                    <h6>Humanities</h6>
                </div>


                
                </div>
            </div>
            
        );
    }
}

export default Industry;