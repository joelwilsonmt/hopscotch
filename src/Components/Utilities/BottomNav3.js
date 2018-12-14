import React from 'react';
import { browserHistory, withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Assignment from '@material-ui/icons/Assignment';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Challenges from "../Challenges/Challenges";
import Map from "../Map/Map";

const styles = {
  root: {
    position: 'relative',
    width: '100%'
  }
};

export default class SimpleBottomNavigation extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.selectBottomNavigationAction = this.selectBottomNavigationAction.bind(this)
  }

  selectBottomNavigationAction(index) {
    this.setState({selectedIndex: index})
    switch(index) {
      case 0: return browserHistory.push('/challenges')
      case 1: return browserHistory.push('/Map')
    }
  }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>

          <BottomNavigationAction
            label="CHALLENGES"
            icon={<Assignment />}
            onChange={() => this.selectBottomNavigationItem(0)}
          />

          <BottomNavigationAction
            label="MAP"
            icon={<LocationOnIcon />}
            onChange={() => this.selectBottomNavigationItem(1)}
          />

        </BottomNavigation>
      </Paper>
    )
  }
}
