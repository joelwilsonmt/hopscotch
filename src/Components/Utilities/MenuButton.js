import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GameRoom from "../GameRoom/GameRoom";
import {GameContext} from "../Contexts/GameContext";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  routeHome = () => {
    this.props.value.setScreen('OpeningScreen');
  }
  routeGameRoom = () => {
    this.props.value.setScreen('GameRoom');
  }
  routeChallenges = () => {
    this.props.value.setScreen('Challenges');
  }
  routeCamera = () => {
    this.props.value.setScreen('Camera');
  }
  routeCircuitReview = () => {
    this.props.value.setScreen('CircuitReview');
  }

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >

        <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeHome();
            }}>
            Home
        </MenuItem>
        <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeGameRoom();
            }}>
            Game Room
        </MenuItem>

        <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeChallenges();
            }}>
            Challenges
        </MenuItem>

        <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeCamera();
            }}>
            Camera
        </MenuItem>
        <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeCircuitReview();
            }}>
            Circuit Review
        </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
