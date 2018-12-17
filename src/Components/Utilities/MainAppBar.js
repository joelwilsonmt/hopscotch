import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import {GameContext} from "../Contexts/GameContext";
import {RouterContext} from "../Contexts/RouterContext";

function MainAppBar(props) {
  const { classes } = props;
  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <GameContext.Consumer>{
              (route) => (
                <MenuButton value={route}/>
              )
          }</GameContext.Consumer>
          <Typography variant="h4" color="inherit">
            CIRCUIT BREAKER
          </Typography>
          <Typography variant="h5" color="inherit">
            <GameContext.Consumer>{
                (game) => ( //can be rewreitten as (userProviderState)
                    <span>{game.user.username}</span>
                )
              }</GameContext.Consumer>
          </Typography>

          <Avatar />
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default MainAppBar;
