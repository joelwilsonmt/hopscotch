import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GameRoomCard from "./GameRoomCard";
// import {UserContext} from "../Contexts/UserContext";
import {GameContext} from "../Contexts/GameContext";
// var dotenv = require('dotenv').config();


class GameRoom extends Component {
  constructor(props) {
    super();
  }
  render() {

    return (
      <div>
        <Paper elevation={1}>
          <br />
          <Typography variant="h1" component="h3" align="center">
            GAME ROOM
          </Typography>
          <GameContext.Consumer>{
              (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
                <div>
                   <GameRoomCard value={game}/>
                 </div>
                )
            }</GameContext.Consumer>
        </Paper>
      </div>
    );//end return
  }//end render
}//end GameRoom component

GameRoom.propTypes = {
  classes: PropTypes.object.isRequired
};

export default GameRoom;
