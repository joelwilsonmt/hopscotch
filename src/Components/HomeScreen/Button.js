import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GameRoom from "../GameRoom/GameRoom";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function ContainedButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}>
        Login!
      </Button>
      <Link to='/GameRoom'>
      <Button variant="contained" color="primary" className={classes.button}>
        Join Circuit!
      </Button>
      </Link>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
