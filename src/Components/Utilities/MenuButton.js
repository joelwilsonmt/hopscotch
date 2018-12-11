import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GameRoom from "../GameRoom/GameRoom";

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
        <Link to="/">
        <MenuItem onClick={this.handleClose}>Home</MenuItem>
        </Link>
        <Link to="/OpeningScreen/">
        <MenuItem onClick={this.handleClose}>Opening Screen</MenuItem>
        </Link>
        <Link to="/GameRoom/">
        <MenuItem onClick={this.handleClose}>Game Room</MenuItem>
        </Link>
        <Link to="/Lobby/">
        <MenuItem onClick={this.handleClose}>Lobby</MenuItem>
        </Link>
        <Link to="/Challenges/">
        <MenuItem onClick={this.handleClose}>Challenges</MenuItem>
        </Link>
        <Link to="/Map/">
        <MenuItem onClick={this.handleClose}>Map</MenuItem>
        </Link>
        <Link to="/Camera/">
        <MenuItem onClick={this.handleClose}>Camera</MenuItem>
        </Link>
        <Link to="/CircuitReview/">
        <MenuItem onClick={this.handleClose}>Circuit Review</MenuItem>
        </Link>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;
