import React from 'react';
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
        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
          SUBMIT
        </Button>
        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
          RETAKE
        </Button>
        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
          CHALLENGES
        </Button>
      </div>
    </div>
  );
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);
