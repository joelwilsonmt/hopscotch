import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import {GameContext} from "../Contexts/GameContext";
import Grow from '@material-ui/core/Grow';


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
        <Paper className="screen">
          <Typography variant="h2">
            CIRCUIT BREAKER
          </Typography>
          <img className="padder logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlnF-3VO2FwapvDmPfhYVk3nIe-1vLRizD4Nv-LZVK3_zl4RZ"/>
          <GameContext.Consumer>{
            (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
              <div>
                <DialogBox value={game} />
              </div>
            )
          }</GameContext.Consumer>
        </Paper>
      </Grow>
    );
  }
}

export default OpeningScreen;
