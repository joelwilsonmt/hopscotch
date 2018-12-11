import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import Grid from '@material-ui/core/Grid';
import {UserContext} from "../Contexts/UserContext";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper}
        elevation={1}>
        <h1>Circuit Breaker</h1>
        <h2>Click the button below to log in</h2>
        <DialogBox />

      </Paper>
      
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(PaperSheet);
