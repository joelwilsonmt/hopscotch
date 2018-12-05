import React, { Component, Fragment } from "react";
import AppBar from "../Utilities/AppBar";
import CameraApp from "./CameraApp";
import CameraButtons from "./CameraButtons";

export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <CameraApp />
        <CameraButtons/>
      </Fragment>
    );
  }
}
