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
import Camera from "../Camera/Camera";
import CircularProgress from "@material-ui/core/CircularProgress";
const haversine = require('haversine')


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
      value: 'challenges'//sets it so that when screen opens, challenges tab has focus

    }
  }
  calcHaversine = (positions, userLocation) => {
      let distanceArray = [];
      let distanceOrder = [];
      console.log("haversine args: positions: ", positions);
      console.log("haversine args: user location: ", userLocation);
      for (var i=0; i < positions.length; i++) {
        let location = {
          latitude: positions[i][0],
          longitude: positions[i][1]
        }
        let user_location = {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude
        }
        distanceArray.push(haversine(location, user_location));
      }//distance Array now contains haversine distance between location and user

      console.log("distance array after haversine calcs: ", distanceArray);

      for(var j = 0; j < distanceArray.length; j++){
        let low = 100;
        let indexOfLow;
        for (var i = 0; i < distanceArray.length; i++){
          if(distanceArray[i] < low) {
            low = distanceArray[i];
            indexOfLow = i;
          }
        }
        distanceOrder.push(indexOfLow);
        distanceArray[indexOfLow] += 1000; //make it so new low is found...
      }
      console.log("Order of challenges after haversine: ", distanceOrder);
      return distanceOrder;
  }
  componentWillMount() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({location:position})

        console.log(this.state.location);
        let positions = [];
        let challenges = this.props.value.circuit.challenges;
        for (var i = 0; i < challenges.length; i++) {
          positions.push(challenges[i].location_gate.position);
        }

          let challengeOrder = this.calcHaversine(positions, this.state.location.coords);
          this.setState({
            challengeOrder: challengeOrder
          })
          console.log("challengeOrder returned from Haversine calc: ", challengeOrder);
      });
    } else {
      console.error("Browser does not support Geolocation");
    }

  }
  componentWillUnmount() {
    //socket.disconnect();
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
    if (this.props.value.view === 'Camera'){
      return (
        <div>
          <GameContext.Consumer>{
              (game) => (
          <Camera value={game}/>
          )}</GameContext.Consumer>
        </div>
      );
    }
    else{
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
            {value === 'challenges' &&
              <Paper>
              {this.state.challengeOrder ? this.state.challengeOrder.map((challenge, i) => {
                return <ExpansionPanels value={this.props.value.circuit.challenges[challenge]}
                    distance={this.state.distances[challenge]}
                        key={i} listId={i}/>
                    }) : <CircularProgress />  }
                  </Paper>}
            {value === 'map' && <Map/>}
          </div>
      );
    }
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
