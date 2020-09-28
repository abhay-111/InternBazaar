import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../Components/UIelements/Navbar/Navbar";
import Footer from "../../Components/UIelements/footer/footer";
import classes from "./Internships.css";
import InternshipCard from "./InternshipcCard";
import CategoryList from "./CategoryList";
import ServerService from "../../ServerService";
import uuid from "react-uuid";

class Internships extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    // console.log(this.props.match.params.id);
    ServerService.getInternships(id).then((response) => {
      this.setState({ posts: response.data.post });
      console.log(response);
    });
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
        />
      );
    });

    return (
      <React.Fragment>
        <Navbar />
        <section className={classes.body}>
          <Container>
            <Row className={classes.Row}>
              <Col xs={4}>
                <CategoryList />
              </Col>

              <Col xs={8}>{internships}</Col>
            </Row>
          </Container>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Internships;