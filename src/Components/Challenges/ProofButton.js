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


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ProofButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick.bind(this);
  }
  handleClick = () => {
    console.log("Proof Button props value at click ", this.props.value);
  }
  render(){
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClick()}>
          Proof
        </Button>
      </div>
    );
  }
}

export default ProofButton;
