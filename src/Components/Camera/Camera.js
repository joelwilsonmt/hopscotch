import React, { Component } from 'react';
// import Camera from 'react-camera';
import axios from 'axios';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import {GameContext} from "../Contexts/GameContext";
// import 'react-html5-camera-photo/build/css/index.css'
require('dotenv').config();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      screenshotTaken: false,
      screenshot: null,
      tab: 0
    };
    this.confirmPhoto.bind(this)
  }
  componentWillMount() {
    console.log("Camera Mounted, this props value: ", this.props.value);
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
    console.log("data: ", this.state.screenshot);
    let req = {};
    req.picture = this.state.screenshot;
    //req.object_to_check = this.props.value.currentChallenge.object_gate
    //req.location_to_check = this.props.value.currentChallenge.location_gate.position
    //req.userId = this.props.value.user.userId
    axios.put(process.env.REACT_APP_BACK_END_SERVER + 'submitChallenge', {screenshot:this.state.screenshot})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
    console.log(this);
  }

  render() {
    const videoConstraints = {
      facingMode: "user"
    };
    if(this.state.screenshotTaken){
      return(
        <div>
        {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
        <div>
        <Button variant="contained" size="small" color="primary" onClick={this.confirmPhoto}>
          Submit
        </Button>
        <Button variant="outlined" size="small" color="primary" onClick={this.resetCamera}>
          Retake
        </Button>
        </div>
        <GameContext.Consumer>{
            (game) => (
        <Button variant="contained" size="small" justify="center"
          color="secondary"
          onClick={() => game.setView('')}
          >
          Back to Challenges
        </Button>
    )}</GameContext.Consumer>
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
        <Button variant="outlined" size="small" color="primary" onClick={this.handleClick}>
          Capture
        </Button>
      </div>
      <GameContext.Consumer>{
          (game) => (
      <Button variant="contained" size="small" justify="center"
        color="secondary"
        onClick={() => game.setView('')}
        >
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
