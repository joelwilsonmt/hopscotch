import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function ButtonSizes(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Link to="/GameRoom/">
          <Button variant="contained" size="small" color="primary" className={classes.margin}>
            JOIN NEW CIRCUIT
          </Button>
        </Link>
        <Link to="/">
          <Button variant="contained" size="small" color="primary" className={classes.margin}>
            LOG OUT
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
