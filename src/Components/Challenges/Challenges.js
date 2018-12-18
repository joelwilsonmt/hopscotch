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
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('localhost:3001/');

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};


class Challenges extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: 'challenges' //sets it so that when screen opens, challenges tab has focus
    }
  }
  componentWillMount() {
    console.log("this value at challenges mount: ", this)
    socket.emit('joinRoom', this.props.value.circuit._id);

  }
  componentWillUnmount() {
    socket.disconnect();
    //socket.emit('joinRoom', this.props.value.user.current_circuit_id);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };


  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { value } = this.state;
    return (
        <div >
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab value="challenges" label="CHALLENGES"  />
              <Tab value="map" label="MAP" />
            </Tabs>
          </AppBar>
          {value === 'challenges' && <ChallengeList/>}
          {value === 'map' && <Map/>}
        </div>
    );
  }
}


function ChallengeList(theme) {
  return (
    <Paper>
      <GameContext.Consumer>{
          (game) => (
            game.circuit.challenges.map(function(challenge, i){
              return <ExpansionPanels value={challenge} key={i} listId={i} />
            })
      )}</GameContext.Consumer>
    </Paper>

  );
  }


function Map(theme) {
  return (
    <Paper>
      <div>
        <GameContext.Consumer>{
            (game) => (
        <MapContainer value={game}/>
        )}</GameContext.Consumer>
      </div>
    </Paper>
  );
}

export default Challenges;
