import React, { Component } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";

// Random component
const Completionist = () => <span>You are good to go!</span>;

export default class extends Component {
  render() {
    return (
      <Countdown date={Date.now() + 120000}>
        <Completionist />
      </Countdown>
    );
  }
}
document.getElementById("root");
