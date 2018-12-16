import React, { Component } from 'react';
// import Camera from 'react-camera';
import CameraButtons from './CameraButtons';
import axios from 'axios';
import Webcam from 'react-webcam';
// import 'react-html5-camera-photo/build/css/index.css'
require('dotenv').config();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      screenshot: null,
      tab: 0
    };
    this.confirmphoto.bind(this)
  }

  // setRef = webcam => {
  // this.webcam = webcam;
  // };

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot()
    this.setState({ screenshot });
  }

  confirmphoto = () => {
    console.log("data: ", this.state.screenshot);
    axios.put(process.env.REACT_APP_BACK_END_SERVER + 'submitChallenge', {screenshot:this.state.screenshot})
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
    console.log(this)
  }

  render() {
    return (
      <div>

        <h1>react-webcam</h1>

        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          ref={node => this.webcam = node}
        />

        <div>

          <div className='screenshots'>

            <div className='controls'>
              <button onClick={this.handleClick}>capture</button>
            </div>

            <h2>Your Submission: </h2>

            {this.state.screenshot ? <img src={this.state.screenshot} /> : null}

            <p>{this.state.screenshot}</p>

            <div>
              <button onClick={this.confirmphoto}>submit</button>
            </div>

          </div>

        </div>

      </div>
    );
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
