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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

class OpeningScreen extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {

  }


  render(){
    return (
      <div>
        <Paper
          elevation={1}>
          <Typography variant="h1" gutterBottom>
            Circuit Breaker
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
