import Axios from "axios";
import React, { Component } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

class testing extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    Axios.get(
      "http://localhost:8080/internship/resume/" +
        localStorage.getItem("userId")
    )
      .then((res) => {
        console.log(res);

        this.setState({ data: res.data });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <embed
        type="text/html"
        src={this.state.data}
        width="300"
        height="200"
      ></embed>
    );
  }
}

export default testing;
