import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import {GameContext} from "../Contexts/GameContext";
import Grow from '@material-ui/core/Grow';
import WorldGif from './world-trans.png'

// const styles = theme => ({
//
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 10,
//     paddingBottom: theme.spacing.unit * 10
//   },
//   paper: {
//     padding: theme.spacing.unit * 22,
//     textAlign: 'center',
//   },
//
// });

class OpeningScreen extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
  }
  render(){
    return (
       <Grow in={true} timeout={1000}>
        <div className="screen">
          <Typography className="white" variant="h2">
            CIRCUIT BREAKER
          </Typography>
          <img className="padder logo" src={WorldGif}/>
          <GameContext.Consumer>{
            (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
              <div className="animated pulse infinite">
                <DialogBox value={game} />
              </div>
            )
          }</GameContext.Consumer>
      </div>
      </Grow>
    );
  }
}

export default OpeningScreen;
