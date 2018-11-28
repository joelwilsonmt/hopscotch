import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const styles = {
  avatar: {
    margin: 5
  }
};

function LetterAvatars(props) {
  const { classes } = props;
  return (
    <Grid container justify="flex-end" alignItems="flex-end">
      <Avatar className={classes.avatar}>H</Avatar>
    </Grid>
  );
}

LetterAvatars.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LetterAvatars);
