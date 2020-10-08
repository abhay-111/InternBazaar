import React, { Component } from "react";

import NavigationBar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import Industry from "../../Components/IntersnshipCategories/Industry";
import Location from "../../Components/IntersnshipCategories/Location";
import { Carousel } from "react-bootstrap";
import classes from "./LandingPage.css";
import c1 from "../../assets/carousels/c1.png";
import c2 from "../../assets/carousels/c2.png";
import c3 from "../../assets/carousels/c3.png";

class LandingPage extends Component {
  render() {
    return (
      <section>
        <NavigationBar />

        <Carousel className={classes.carousel}>
          <Carousel.Item>
            <img
              src={c1}
              style={{ minHeight: "8rem" }}
              className="d-block w-100"
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ minHeight: "8rem" }}
              className="d-block w-100"
              src={c2}
              alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ minHeight: "8rem" }}
              className="d-block w-100"
              src={c3}
              alt=""
            />
          </Carousel.Item>
        </Carousel>

        <Location />
        <Industry />

        <Footer />
      </section>
    );
  }
}

export default LandingPage;
