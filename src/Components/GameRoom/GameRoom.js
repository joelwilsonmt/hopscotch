import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GameRoomCard from "./GameRoomCard";
import AppBar from "../Utilities/AppBar";
import axios from "axios";
var dotenv = require('dotenv').config();


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class PaperSheet extends Component {
  constructor(props) {
    super();
     const { classes } = props;
      this.state= {
        location: {}

      }
  }


  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //this.setState({location:position})

        console.log(position);
      });
    } else {
      console.error("Browser does not support Geolocation");
    }
    var userId = '5c096fa025531e2d29ed67c8';
    var roomName = '';
    //get a list of circuits that match a user's boundary:
    axios.post(process.env.BACK_END_SERVER + 'getCircuits/', {_id: userId}).then(
      function(res) {
        console.log("response here:");
        console.log(res);
        roomName = res.data[0]._id;
        console.log("room name: " + roomName);
      }).catch(function(err){
        console.error(err);
        if(err.response.status == 404){
          axios.post(process.env.BACK_END_SERVER + 'addCircuit/', {_id: userId}).then(
          function(res){
            console.log(res);
            roomName = res.data[0]._id;

          }).catch(function(err){
            console.error(err);
          });
        }
      });

  }


  render() {

    return (
      <div>
        <AppBar />
        <Paper elevation={1}>
          <br />
          <Typography variant="h5" component="h3" align="center">
            GAME ROOM
          </Typography>
          <GameRoomCard />
        </Paper>
      </div>
    );
  }

}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
