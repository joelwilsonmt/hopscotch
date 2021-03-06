import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import {GameContext} from "../Contexts/GameContext";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
//https://thumbs.gfycat.com/PlainVapidGalah-small.gif
//https://thumbs.gfycat.com/ArcticEntireFrenchbulldog-size_restricted.gif
class OpeningScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      willGrow: true,
      introWindowOpen: true,
      slide: 0,
      messages: [
        {message: 'Hopscotch is a bar crawl game where you have your favorite drink at downtown bars',
        buttonText: 'Next'},
        {message: 'Go to each bar (square) in a Hopscotch and take a picture with your empty glass there',
        buttonText: 'Next'},
        {message: 'Visit all the squares to win the Hopscotch!',
        buttonText: 'Close'}
      ]
    };
  }
  componentWillMount() {
    console.log(this.state);
  }
  componentWillUnmount() {
    this.setState({
      willGrow: false
    });
  }
  nextMessage = (slideNum) => {
    console.log("slide number: ", slideNum);
    slideNum += 1;
    if(slideNum > 2) {
      this.setState({
        introWindowOpen: false
      });
    }
    else {
      this.setState({
        slide: slideNum
      });
    }
  }
  handleClose = () => {
    this.setState({
      introWindowOpen: false
    });
  }
  render(){
    return (
       <Grow in={this.state.willGrow} timeout={1000}>

        <div className="screen">

          <Typography className="white title" variant="h2">
            HOPS SCOTCH
          </Typography>
          <img className="padder logo" src='https://thumbs.gfycat.com/PlainVapidGalah-small.gif'/>
          <GameContext.Consumer>{
            (game) => ( //can rewrite this as (userProviderState) => () if that's more clear
              <div className="animated pulse infinite">
                <DialogBox value={game} />
              </div>
            )
          }</GameContext.Consumer>
          <Dialog
            className="trans"
            open={this.state.introWindowOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle className="center" id="form-dialog-title">RULES</DialogTitle>
            <DialogContent>
              <Typography className="center">
                {this.state.messages[this.state.slide].message}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                className="animated pulse infinite center"
                color="primary"
                size="small"
                justify="center"
                onClick={() => {
                  this.nextMessage(this.state.slide)
                  }}>
                {this.state.messages[this.state.slide].buttonText}
              </Button>
            </DialogActions>
          </Dialog>
      </div>
      </Grow>

    );
  }
}

export default OpeningScreen;
