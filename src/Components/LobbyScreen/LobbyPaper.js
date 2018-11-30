import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CountDown from "../CountDown";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h3" component="h3" align="center">
          Lobby
        </Typography>
        <Typography variant="p">The Circuit will begin in :</Typography>

        <CountDown />
        <br />
        <Typography variant="h5" component="h3" align="left">
          Rules:
        </Typography>
        <Typography variant="h6" component="h3" align="left">
          * No going on private property unless you own it.
          <br />
          * Obey all traffic laws.
          <br />
          *Pack it in, pack it out. Leave no trace.
          <br />
          *If in a store or restaurant, please be polite and respectful. If you
          break it, you bought it.
          <br />
          *You must get a usable picture to complete a challenge.
          <br />
          *Once the circuit starts it's go time, even if you are the only one
          there.
        </Typography>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
