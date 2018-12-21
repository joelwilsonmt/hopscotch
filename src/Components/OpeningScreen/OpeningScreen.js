import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import Grid from '@material-ui/core/Grid';
import {GameContext} from "../Contexts/GameContext";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';




const styles = theme => ({

  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10
  },
  paper: {
    padding: theme.spacing.unit * 22,
    textAlign: 'center',
  },

});



class OpeningScreen extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {

  }


  render(){
    return (

        <Paper className="opening-screen"
          elevation={1}>
          <div>
          <Typography variant="h1" gutterBottom className="logo">
            Circuit Breaker
          </Typography>

            <GameContext.Consumer>{
                (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
                  <div>
                    <DialogBox value={game} />
                  </div>
                )
              }</GameContext.Consumer>
          </div>
        </Paper>
      </div>
    );
  }
}



export default OpeningScreen;
