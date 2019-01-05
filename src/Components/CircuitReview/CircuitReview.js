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

let id = 0;
function createData(name, completed) {
  id += 1;
  return { name, completed };
}

const rows = [
  createData('User Name 1', 2),
  createData('User Name 2', 2),
  createData('User Name 3', 2),
  createData('User Name 4', 2),
  createData('User Name 5', 2),
  createData('User Name 6', 2),
  createData('User Name 7', 2),
  createData('User Name 8', 2),
];

class CircuitReview extends React.Component {
  constructor () {
    super()
  }
  render(){
    return (
      <div>
      <Paper>
        <Typography variant="h5" align="center">CIRCUIT REVIEW</Typography>
      <ul>
      <GameContext.Consumer>{
          (game) => (
            game.circuit.challenges.map(function(challenge, i){
              return <li key={i}> value={challenge.full_challenge_text} number={challenge.id_users_completed.length}  listId={i} </li>
            })
      )}</GameContext.Consumer>
      </ul>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>USER</TableCell>
              <TableCell numeric>COMPLETED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {/*  <GameContext.Consumer>{
              (game) => (
          <p> {game.user.username}</p>
          )}</GameContext.Consumer>*/}

        {/*<GameContext.Consumer> {
           (game) => (
             game.circuit.challenges.map(function(challenge, i) {
               return <TableRow key={i}>
                  <TableCell component="th" scope="row">
                     {challenge.full_challenge_text}
                   </TableCell>
                   <TableCell numeric>{challenge.id_users_completed.length}</TableCell>
                 </TableRow>

             })
           )
         }
            </GameContext.Consumer>*/}
          </TableBody>
        </Table>
        <CircuitReviewButtons />
      </Paper>
      </div>
    );
  }
}

export default CircuitReview;
