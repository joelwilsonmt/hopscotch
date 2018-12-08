import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <div>
      <div align="center">
        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          SUBMIT
        </Button>
        <Button variant="outlined" size="small" color="primary" className={classes.margin}>
          RETAKE
        </Button>
        <Link to="/Challenges/">
          <Button variant="outlined" size="small" color="primary" className={classes.margin}>
            CHALLENGES
          </Button>
        </Link>
      </div>
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);
