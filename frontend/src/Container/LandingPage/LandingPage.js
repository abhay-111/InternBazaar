import React, { Component } from "react";

import NavigationBar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import classes from "./LandingPage.css";
import Industry from "../../Components/IntersnshipCategories/Industry";
import Location from "../../Components/IntersnshipCategories/Location";

class LandingPage extends Component {
  render() {
    return (
      <section>
        <NavigationBar />
        <form className={classes.SearchSpace}>
          <h2>FIND THE BEST WINTER &amp; SUMMER INTERNSHIPS FOR STUDENTS</h2>
          <br />
          <input
            type="text"
            name="searched"
            placeholder="   Search your dream internship"
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
        <div>
          <Location />
          <Industry />
        </div>
        <Footer />
      </section>
    );
  }
}

export default LandingPage;
