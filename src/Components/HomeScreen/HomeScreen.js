import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "./Button";

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
      <body background="http://circuits-central.com/wp-content/uploads/2015/09/home-2.jpg">
      <img src="http://www.practicalphysics.org/images/PP_Electric_circuits.jpg" />
        <h1>Circuit Breaker</h1>
        <Typography variant="h5" component="h3" />
        <Typography component="p" />
        <Button />
        </body>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
