import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import MenuButton from "./MenuButton";
import Avatar from "./Avatar";
import {GameContext} from "../Contexts/GameContext";
// import {RouterContext} from "../Contexts/RouterContext";


function MainAppBar(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <GameContext.Consumer>{
            (route) => (
              <MenuButton value={route}/>
            )
          }</GameContext.Consumer>

        <Typography variant="h3" color="inherit">
            Circuit Breaker
          </Typography>
          <Typography variant="subtitle1: 'h6'" color="inherit">
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
