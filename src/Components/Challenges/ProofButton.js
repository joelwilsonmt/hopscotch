import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {GameContext} from "../Contexts/GameContext";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import GameRoom from '../GameRoom/GameRoom';
import Camera from '../Camera/Camera';


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
    //this.handleClick.bind(this);
  }
  componentWillMount(){
  }
  handleClick() {
    console.log("proof button clicked");
   console.log("Proof button this prop value at click", this.props.value);
  }
  render(){
    return (
      <div>

        <GameContext.Consumer>{
            (game) => (
        <Button variant="contained"
          size="small" justify="center"
          color="primary"
          disabled={this.props.disabled}
          onClick={() => {
            game.setCurrentChallenge(this.props.value);
            game.setView('Camera');
          }}
          >
          Take Picture
        </Button>
    )}</GameContext.Consumer>

      </div>
    );
  }
}

export default ProofButton;
