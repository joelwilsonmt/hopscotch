import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
            HOME
          </MenuItem>

          <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeGameRoom();
            }}>
            GAME ROOM
          </MenuItem>

          <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeChallenges();
            }}>
            CHALLENGES
          </MenuItem>

          <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeCamera();
            }}>
            CAMERA
          </MenuItem>

          <MenuItem onClick={
            (event) => {
              this.handleClose();
              this.routeCircuitReview();
            }}>
            CIRCUIT REVIEW
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
