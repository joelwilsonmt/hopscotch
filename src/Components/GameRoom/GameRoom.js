import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GameRoomCard from "./GameRoomCard";
import AppBar from "../Utilities/AppBar"

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

<<<<<<< HEAD
  componentWillMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        //this.setState({location:postion})
=======
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        //this.setState({location:position})
>>>>>>> 5243485c9bf9375646d353cc754ae4ea25202095
        console.log(position);
      });
    } else {
      console.error("Browser does not support Geolocation");
    }
  }

<<<<<<< HEAD
render () {
  return (
    <div>
      <Paper elevation={1}>
        <Typography variant="h3" component="h3" align="center">
          Game Room
        </Typography>
        <GameRoomCard />
      </Paper>
    </div>
  );
}
=======
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
>>>>>>> 5243485c9bf9375646d353cc754ae4ea25202095
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
