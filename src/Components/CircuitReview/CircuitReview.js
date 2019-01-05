import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanels from "../Challenges/ExpansionPanels";
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import CircuitReviewButtons from "./CircuitReviewButtons";
import {GameContext} from "../Contexts/GameContext";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
});

class CircuitReview extends React.Component {
  constructor () {
    super()
  }
  render(){
    return (
      <div>
      <Paper>
        <Typography variant="h5" align="center">CIRCUIT REVIEW</Typography>
    <List>
      <GameContext.Consumer>{
          (game) => (
            game.circuit.challenges.map(function(challenge, i){
              return <ListItem>
                    <ListItemText
                      primary={challenge.full_challenge_text}
                      secondary={challenge.id_users_completed ? 'Number of users who completed this challenge: ' + challenge.id_users_completed.length : null}
                    />
                </ListItem>
            })
      )}</GameContext.Consumer>
  </List>
  <GameContext.Consumer>{
      (game) => (
        <CircuitReviewButtons value={game}/>
          )}</GameContext.Consumer>
      </Paper>
      </div>
    );
  }
}

export default CircuitReview;
