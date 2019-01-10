import React from 'react';
<<<<<<< HEAD
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import CircuitReviewButtons from "./CircuitReviewButtons";
=======
import Grow from '@material-ui/core/Grow';
import ExpansionPanels from "../Challenges/ExpansionPanels";
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import GoHomeButton from "./GoHomeButton";
>>>>>>> Development
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

<<<<<<< HEAD
class CircuitReview extends React.Component {
=======
class ContactUs extends React.Component {
>>>>>>> Development
  constructor () {
    super()
    this.state = {
      willGrow: true
    };
  }
<<<<<<< HEAD
=======
  componentWillUnmount() {

  }
>>>>>>> Development

  render(){

    return (
      <Grow in={this.state.willGrow} timeout={1000}>
      <div class="screen white">
<<<<<<< HEAD
        <Typography variant="h5" align="center">Contact Us</Typography>
        <List>
           <ListItem>
                        <ListItemText
                          primary={'Jeremy Cornell'}
                          secondary={'jeremy.cornell77@gmail.com'}/>
                    </ListItem>
                    <ListItemText
                      primary={'Jamie Iguchi'}
                      secondary={'jamie.iguchi@gmail.com'}/>
                </ListItem>
                <ListItemText
                  primary={'Kristin Peterson'}
                  secondary={'kristinjoypeterson@gmail.com'}/>
            </ListItem>
            <ListItemText
              primary={'Jeol Wilson'}
              secondary={'joel.wilson.mt@gmail.com'}/>
        </ListItem>

        </List>
        <GameContext.Consumer>{
            (game) => (
              <CircuitReviewButtons value={game}/>
=======
        <Typography variant="h5" align="center">CONTACT US</Typography>
        <List>
          <ListItem>
              <ListItemText
                  primary={'Jeremy Cornell'}
                  secondary={'jeremy.cornell77@gmail.com'}/>
          </ListItem>
          <ListItem>
              <ListItemText
                  primary={'Jamie Iguchi'}
                  secondary={'jamie.iguchi@gmail.com'}/>
          </ListItem>
          <ListItem>
              <ListItemText
                  primary={'Kristin Peterson'}
                  secondary={'kristinjoypeterson@gmail.com'}/>
          </ListItem>
          <ListItem>
              <ListItemText
                  primary={'Joel Wilson'}
                  secondary={'joel.wilson.mt@gmail.com'}/>
          </ListItem>
        </List>
        <GameContext.Consumer>{
            (game) => (
              <GoHomeButton value={game}/>
>>>>>>> Development
        )}</GameContext.Consumer>
      </div>
      </Grow>
    );
  }
}

<<<<<<< HEAD
export default CircuitReview;
=======
export default ContactUs;
>>>>>>> Development
