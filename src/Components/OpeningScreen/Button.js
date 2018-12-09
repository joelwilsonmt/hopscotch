import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import HomeScreen from "../HomeScreen/HomeScreen";

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
    <Link to='/HomeScreen'>
      <Button variant="contained" color="primary" className={classes.button}>
        Get Started!
      </Button>
      </Link>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContainedButtons);
