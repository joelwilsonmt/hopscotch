import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import {GameContext} from "../Contexts/GameContext";

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
      <div height="100hv">
        <Paper>
          <Typography variant="h4">
            CIRCUIT BREAKER
          </Typography>
          <GameContext.Consumer>{
            (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
              <div>
                <DialogBox value={game} />
              </div>
            )
          }</GameContext.Consumer>
        </Paper>
      </div>
    );
  }
}

export default OpeningScreen;
