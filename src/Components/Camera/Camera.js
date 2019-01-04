import React, { Component } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import {GameContext} from "../Contexts/GameContext";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
require('dotenv').config();
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      screenshotTaken: false,
      screenshot: null,
      tab: 0,
      challengeCompleteOpen: false,
      challengeRejectedOpen: false
    };
    this.confirmPhoto.bind(this)
  }

  componentWillMount() {
    console.log(this);
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({location:position});
    });
    console.log("current challenge in question", this.props.value.currentChallenge);
    console.log("socket methods etc: ", this.props.socket);
    //put this.props.socket.sendWin() in axios put for win
  }
  componentWillUnmount() {
    this.props.value.setView('');
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot()
    this.setState({
      screenshot: screenshot,
      screenshotTaken: true
    });

  }

  resetCamera = () => {
    this.setState({
      screenshotTaken: false,
      screenshot: null
    });
  }

  confirmPhoto = () => {
    // console.log("data: ", req);
    console.log("current challenge index: ", this.props.value.currentChallengeIndex);
    let req = {
      screenshot: this.state.screenshot,
      check_word: this.props.value.currentChallenge.object_gate,
      location_to_check: this.props.value.currentChallenge.location_gate.position,
      userId: this.props.value.user._id,
      circuitId: this.props.value.circuit._id,
      challengeIndex: this.props.value.currentChallengeIndex,
      user_position: [this.state.location.coords.latitude, this.state.location.coords.longitude]
    };
    // console.log("data to server: ", req);
    console.log("the challenge ID in question: ", this.props.value.currentChallenge._id)
    axios.put(process.env.REACT_APP_BACK_END_SERVER + 'submitChallenge', req)
    .then((res)=>{
      console.log(res);
      if(res.data.circuitComplete){
        console.log("circuit complete!");
        //socket event disconnect all`
      }
      else if(res.data.challengeComplete){
        //socket event update all (RECEIVE_WIN)
        console.log("challenge complete!");
          this.setState({
          challengeCompleteOpen: true
        });
        this.props.socket.sendWin();
      }
      else {
        this.setState({
          challengeRejectedOpen: true
        })
      }
    })
    .catch((err)=>{
      console.log(err);
    });
    // console.log(this);
  }

  render() {
    const videoConstraints = {
      facingMode: "user"
    };
    let currentChallenge = this.props.value.currentChallenge;
    if(this.state.screenshotTaken){
      return(
        <div>
        {this.state.screenshot ? <img src={this.state.screenshot} alt='' /> : null}
          <div>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={this.confirmPhoto}>
              Submit
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={this.resetCamera}>
              Retake
            </Button>
          </div>
          <GameContext.Consumer>{
            (game) => (
              <Button
                variant="contained"
                size="small"
                justify="center"
                color="primary"
                onClick={() => game.setView('')}>
                Back to Challenges
              </Button>
          )}</GameContext.Consumer>
        <Dialog
          open={this.state.challengeCompleteOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"That's A Great Picture!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Picture and Location Confirmed!
              Well Played!
              Keep it Going!
            </DialogContentText>
          </DialogContent>
          <GameContext.Consumer>{
            (game) => (
          <DialogActions>
            <Button onClick={() => game.setView('Challenges')} color="primary">
              Back to Challenges
            </Button>
          </DialogActions>
        )}</GameContext.Consumer>
        </Dialog>
        <Dialog
          open={this.state.challengeRejectedOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"We May Have Missed Something!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              We are sorry to say that something doesn't match up!
              Make sure you have the correct item!
              Make sure you are in the correct place!
              Try taking the picture again.
            </DialogContentText>
          </DialogContent>
          <GameContext.Consumer>{
            (game) => (
          <DialogActions>
            <Button onClick={() => game.setView('Camera')} color="primary">
              Try Again
            </Button>
            <Button onClick={() => game.setView('Challenges')} color="primary">
              Back to Challenges
            </Button>

          </DialogActions>
          )}</GameContext.Consumer>
        </Dialog>
      </div>
      );
    }
    else{
      return (
        <div>
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            ref={node => this.webcam = node}
            screenshotQuality={.8}
            width={375}
            height={300}
            videoConstraints={videoConstraints}
          />
          <div>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={this.handleClick}>
              Capture
            </Button>
          </div>
          <GameContext.Consumer>{
            (game) => (
              <Button
                variant="contained"
                size="small"
                justify="center"
                color="primary"
                onClick={() => game.setView('')}>
                Back to Challenges
              </Button>
          )}</GameContext.Consumer>
        </div>
      );
    }//closes else
  }
}


/*
ORIGINAL CAMERA.JS CODE WITH OLD NPM

export default class App extends Component {

  constructor(props) {
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.state = {blob:''};
    this.confirmphoto.bind(this)
  }

  takePicture() {
    this.camera.capture()
    .then(blob => {
      this.img.src = URL.createObjectURL(blob)
      this.img.onload = () => {
        URL.revokeObjectURL(this.src)
      }
      this.setState({
        blob:blob
      })
    })
  }

  confirmphoto() {
    console.log("blob contents:", this.state.blob);
    axios.post(process.env.REACT_APP_BACK_END_SERVER + 'submitChallenge', this.state.blob)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });//end axios call
  }

  render() {
    return (
      <div style={style.container}>

        <Camera
          style={style.preview}
          ref={(cam) => {
            this.camera = cam;
          }}
        >

          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>

        <img
          style={style.captureImage}
          ref={(img) => {
            this.img = img;
          }}
        />

        <CameraButtons confirmphoto={
              this.confirmphoto.bind(this)}/>

      </div>
    );
  }
}

*/


/*
STYLE TO UNLOAD LATER

const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%'
  }
};

*/
