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
import io from 'socket.io-client';
import Camera from "../Camera/Camera";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const haversine = require('haversine');


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
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Challenges extends React.Component {
  constructor(props) {
    super();
    this.updateCurrentUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({location:position})
          let positions = [];
          let challenges = this.props.value.circuit.challenges;
          for (var i = 0; i < challenges.length; i++) {
            positions.push(challenges[i].location_gate.position);
          }

            let challengeOrder = this.calcHaversine(positions, this.state.location.coords);
            this.setState({
              challengeOrder: challengeOrder
            })

        });
      } else {
        console.error("Browser does not support Geolocation");
      }
    }
    this.state = {
      value: 'challenges',//sets it so that when screen opens, challenges tab has focus
      location: {
        coords: []
      },
      updateCurrentUserLocation: this.updateCurrentUserLocation
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
      this.setState({
        distanceArray: distanceArray
      });


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
  componentDidMount() {

  }
  componentWillUnmount() {
    //terminate the socket once the user leaves the challenge screen

  }
  changeTab = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = styles;
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
                onChange={this.changeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab value="challenges" label="CHALLENGES"  />
                <Tab value="map" label="MAP" />
              </Tabs>
            </AppBar>
            {value === 'challenges' && <Paper>
              {this.state.challengeOrder ? this.state.challengeOrder.map((challenge, i) => {
                return <ExpansionPanels value={this.props.value.circuit.challenges[challenge]}
                        distance={this.state.distanceArray[challenge]-1000}
                        updateDistance={this.state.updateCurrentUserLocation}
                        key={i} listId={i} order={challenge}/>
              }) : ''}
              {/*<GameContext.Consumer>{
                  (game) => (
                    game.circuit.challenges.map(function(challenge, i){
                      return <ExpansionPanels value={challenge} key={i} listId={i} />
                    })
              )}</GameContext.Consumer>*/}
            </Paper>}
            {value === 'map' && <Map/>}
          </div>
      );
    }
  }
}




function Map(theme) {
  return (
    <Paper>
      <Typography variant="h3">
        Map
      </Typography>
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
