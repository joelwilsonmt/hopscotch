import React, { Component, Fragment } from "react";
import AppBar from "./AppBar/AppBar";
import ChallengePaper from "./ChallengeList/ChallengePaper"

export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <ChallengePaper />
      </Fragment>
    );
  }
}
