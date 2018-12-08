import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import GameRoom from '../GameRoom/GameRoom';
import Camera from '../Camera/Camera'
<<<<<<< HEAD
=======

>>>>>>> 5243485c9bf9375646d353cc754ae4ea25202095


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function TextButtons(props) {
  const { classes } = props;
  return (
    <div>
<<<<<<< HEAD
    <Link to='../Camera/Camera'>
=======
    <Link to='/Camera'>
>>>>>>> 5243485c9bf9375646d353cc754ae4ea25202095
      <Button size="small" color="primary">
        Proof
      </Button>
      </Link>
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);
