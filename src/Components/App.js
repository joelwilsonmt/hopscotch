import React, { Component, Fragment } from "react";
import AppBar from "./Layouts/AppBar";
import Paper from "./GameRoom/Paper"

export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <Paper />
      </Fragment>
    );
  }
}
