import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class ButtonSizes extends React.Component {
  constructor () {
    super()
  }
  componentWillMount() {
    console.log(this.props.value);
  }
  handleClick = () => {
    //clear current user circuit
    //delete circuit
    //change to screen
    this.props.value.setScreen('GameRoom');
  }
  render(){
  return (
    <div>
      <div>
          <Button variant="contained" onClick={this.handleClick} size="small" color="primary">
            JOIN NEW CIRCUIT
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
