import React, { Component } from "react";

import NavigationBar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import Industry from "../../Components/IntersnshipCategories/Industry";
import Location from "../../Components/IntersnshipCategories/Location";
import { Container, Carousel } from "react-bootstrap";
import c1 from "../../assets/carousels/c1.png";
import c2 from "../../assets/carousels/c2.png";
import c3 from "../../assets/carousels/c3.png";

class LandingPage extends Component {
  render() {
    return (
      <section>
        <NavigationBar />

        <Carousel>
          <Carousel.Item>
            <img src={c1} className="d-block w-100" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={c2} alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={c3} alt="" />
          </Carousel.Item>
        </Carousel>

        <Container fluid>
          <Location />
          <Industry />
        </Container>

        <Footer />
      </section>
    );
  }
}

export default LandingPage;
