import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import ExpansionPanels from "./ExpansionPanels";
import MapContainer from "../Map/MapContainer";
import {GameContext} from "../Contexts/GameContext";
import Challenges from "./Challenges";
import socketIOClient from 'socket.io-client';



class ChallengesWrapper extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <GameContext.Consumer>{
          (game) => (
        <Challenges value={game}/>
        )}</GameContext.Consumer>
    );
  }
}

export default ChallengesWrapper;
