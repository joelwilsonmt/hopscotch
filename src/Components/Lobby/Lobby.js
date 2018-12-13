import React from "react";
import axios from 'axios';

import AppBar from "../Utilities/AppBar";


import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import socketIOClient from 'socket.io-client';



const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});


function PaperSheet(props) {
  const { classes } = props;
  const socket = socketIOClient('localhost:3001/');
  return (
    <div>
      <AppBar />
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" align="center">
          LOBBY
        </Typography>

        <br />
        <Typography variant="h6" component="h3" align="left">
          RULES
        </Typography>
        <Typography component="h3" align="left">
          <ul>
            <li>No going on private property unless you own it.</li>
            <li>Obey all traffic laws.</li>
            <li>Pack it in, pack it out. Leave no trace.</li>
            <li>If in a store or restaurant, please be polite and respectful. If you
              break it, you bought it.</li>
            <li>You must get a usable picture to complete a challenge.</li>
            <li>Once the circuit starts it's go time, even if you are the only one
              there.</li>
          </ul>
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
