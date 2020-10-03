import Axios from "axios";
import React, { Component } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

class testing extends Component {
  state = {
    data: "",
  };

  componentDidMount() {
    Axios.post("http://localhost:8080/auth/verifytoken", "", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);

        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  render() {
    return <div></div>;
  }
}

export default testing;
