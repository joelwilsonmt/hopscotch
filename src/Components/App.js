import React, { Component, Fragment } from "react";
import AppBar from "./Layouts/AppBar";
import LobbyPaper from "./LobbyScreen/LobbyPaper"

export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <LobbyPaper />
      </Fragment>
    );
  }
}
