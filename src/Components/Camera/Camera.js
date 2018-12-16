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
    this.state = {
      screenshot: null,
      tab: 0
    };
  }

  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  }

  confirmphoto() {
    console.log("data: ", this.state);
    axios.post(process.env.REACT_APP_BACK_END_SERVER + 'submitChallenge', this.state)
    .then((res)=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  render() {
    return (
      <div>

        <h1>react-webcam</h1>

        <Webcam
          audio={false}
          ref={node => this.webcam = node}
        />

        <div>

          <div className='screenshots'>

            <div className='controls'>
              <button onClick={this.handleClick}>capture</button>
            </div>

            <h2>Your Submission: </h2>

            {this.state.screenshot ? <img src={this.state.screenshot} /> : null}

          </div>

        </div>

      </div>
    );
  }
}

/*
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
