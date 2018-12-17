import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class ButtonSizes extends React.Component {
  constructor () {
    super()
  }
  render () {
    return(
      <div>
        <div align="center">
          <Button variant="outlined" size="small" color="primary" onClick={this.props.confirmphoto}>
            SUBMIT
          </Button>
          <Button variant="outlined" size="small" color="primary">
            RETAKE
          </Button>
            <Button variant="outlined" size="small" color="primary">
              CHALLENGES
            </Button>
        </div>
      </div>
    );
  }
}

ButtonSizes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSizes);
