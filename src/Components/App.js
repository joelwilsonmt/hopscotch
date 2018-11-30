import React, { Component, Fragment } from "react";
import AppBar from "./AppBar/AppBar";
import ChallengePaper from "./ChallengeList/ChallengePaper"
import BottomNav from "./BottomNav/BottomNav";


export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />
        <ChallengePaper />
        <BottomNav />
      </Fragment>
    );
  }
}
