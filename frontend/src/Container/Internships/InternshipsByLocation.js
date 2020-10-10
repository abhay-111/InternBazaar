import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import classes from "./Internships.css";
import InternshipCard from "./InternshipCard";
import CategoryList from "./CategoryList";
import ServerService from "../../Services/ServerService";
import uuid from "react-uuid";

class Internships extends Component {
  state = {
    posts: [],
    id: "",
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
    //console.log(id);
    console.log(this.props.match.params.id);
    ServerService.getInternshipsByLocation(id)
      .then((response) => {
        this.setState({ posts: response.data.post });
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  componentDidUpdate() {
    let id = this.props.match.params.id;
    //console.log(id);
    if (id !== this.state.id) {
      this.setState({ id: id });
      console.log(this.props.match.params.id);
      ServerService.getInternshipsByLocation(id)
        .then((response) => {
          this.setState({ posts: response.data.post });
          console.log(response);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  render() {
    const internships = this.state.posts.map((post) => {
      return (
        <InternshipCard
          key={uuid()}
          id={post._id}
          applyBy={post.applyBy}
          companyName={post.companyName}
          description={post.description}
          internshipPeriod={post.internshipPeriod}
          internshipType={post.internshipType}
          location={post.location}
          skillsReq={post.skillsReq}
          startDate={post.startDate}
          stipend={post.stipend}
          title={post.title}
          vacancy={post.vacancy}
          avgrating={post.avgrating}
        />
      );
    });
    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col md={4} xs={12}>
                <CategoryList />
              </Col>

              <Col md={8} xs={12}>
                {internships}
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Internships;
