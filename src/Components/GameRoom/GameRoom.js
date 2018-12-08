import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GameRoomCard from "./GameRoomCard";
import AppBar from "../Utilities/AppBar";
import axios from "axios";

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
    //axios.get('http://localhost:3001/getCircuits/').then(if response is false);
    const TESTING = false;
    if(TESTING){
      axios.post('http://localhost:3001/addCircuit/', {_id: '5c0c34cffd35592351467554'}).then(
      function(res){
        console.log(res);

      }).catch(function(err){
        console.error(err);
      });
    }
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
