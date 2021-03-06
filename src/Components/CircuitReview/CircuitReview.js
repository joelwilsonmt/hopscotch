import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
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
    this.state = {
      willGrow: true
    };
  }
  componentWillUnmount() {

  }
  componentWillMount() {
    console.log("this props value will mount: ", this.props.value);
    this.props.value.clearCurrentCircuit(this.props.value.user._id);
  }
  componentDidMount() {
    console.log("this props value did mount: ", this.props.value);
  }
  render(){
    console.log("this props value render: ", this.props.value);
    return (
      <Grow in={this.state.willGrow} timeout={1000}>
      <div class="screen white">
        <Typography variant="h5" align="center">WHAT YOU JUST DID</Typography>
        <List>
          <GameContext.Consumer>{
              (game) => (
                game.circuit.challenges.map(function(challenge, i){
                  return <ListItem>
                        <ListItemText
                          primary={`${i+1}) ${challenge.full_challenge_text}`}
                          secondary={`Number of drinkers who hopped this square: ${challenge.id_users_completed.length-1}`}/>
                    </ListItem>
                })
          )}</GameContext.Consumer>
        </List>
        <GameContext.Consumer>{
            (game) => (
              <CircuitReviewButtons value={game}/>
        )}</GameContext.Consumer>
      </div>
      </Grow>
    );
  }
}

export default CircuitReview;
