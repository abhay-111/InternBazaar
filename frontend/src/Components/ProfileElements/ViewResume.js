import React, { Component } from "react";
import placeholder from "../../assets/studentplaceholder.jpg";
import classes from "./ProfileElements.css";
import ServerService from "../../Services/ServerService";

class ViewResume extends Component {
  state = {
    path: "",
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    ServerService.viewResume(userId)
      .then((res) => {
        console.log(res);
        this.setState({ path: res.data.path });
        const path = "http://localhost:8080/" + res.data.path;
        // console.log(path);
        window.open(path);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    //console.log(this.props.path);
    // const userId = localStorage.getItem("userId");
    // ServerService.viewResume(userId)
    //   .then((res) => {
    //     console.log(res);

    const path = "http://localhost:8080/" + this.state.path;
    // console.log(path);
    window.open(path);
    //  })
    //  .catch((err) => {
    //    console.log(err);
    //  });
  }

  render() {
    return <img src={placeholder} alt="" className={classes.placeholder} />;
  }

  //componentDidMount() {
  //  const data = {
  //    userId: localStorage.getItem("userId"),
  //    userType: localStorage.getItem("userType"),
  //  };
  //  ServerService.viewProfile(data)
  //    .then((response) => {
  //      console.log(response);
  //      this.setState({ data: response.data.user });
  //    })
  //    .catch((err) => {
  //      console.log(err.response);
  //    });
  //}

  // render() {
  //   return (
  //     <Card className={classes.card}>
  //       <Card.Body>
  //         <Card.Title
  //           style={{
  //             textAlign: "center",
  //             fontSize: "1.5rem",
  //             fontWeight: "bold",
  //           }}
  //         >
  //           VIEW RESUME
  //         </Card.Title>
  //         <Container className={classes.data}>
  //           <Row>
  //             <h4>Name : </h4> <span>{this.state.data.name}</span>
  //           </Row>
  //           <Row>
  //             <h4>E-Mail : </h4> <span>{this.state.data.email}</span>
  //           </Row>
  //           <Row>
  //             <h4>Contact : </h4> <span>{this.state.data.phone}</span>
  //           </Row>
  //           <Row>
  //             <h4>Preferred Locations : </h4>{" "}
  //             <span>{this.state.data.location}</span>
  //           </Row>
  //           <Row>
  //             <h4>Educational Details : </h4>{" "}
  //             <span>{this.state.data.education}</span>
  //           </Row>
  //           <Row>
  //             <h4>Skills : </h4> <span>{this.state.data.skills}</span>
  //           </Row>
  //           <Row>
  //             <h4>Links : </h4> <span>{this.state.data.links}</span>
  //           </Row>
  //           <Row>
  //             <h4>Jobs/Internships : </h4> <span>{this.state.data.jobs}</span>
  //           </Row>
  //           <Row>
  //             <h4>Additional Details : </h4>{" "}
  //             <span>{this.state.data.additional}</span>
  //           </Row>
  //         </Container>
  //       </Card.Body>
  //     </Card>
  //   );
  // }
}

export default ViewResume;
