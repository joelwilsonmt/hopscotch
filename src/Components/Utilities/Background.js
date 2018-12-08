import React, { Component } from 'react';
import Background from '../Images/circuit2.jpg';

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

export default class Section extends Component {
  render() {
    return (
      <section style={ sectionStyle }>
      </section>
    );
  }
}
