import React, { Component } from 'react';
import Camera from 'react-camera';
import CameraButtons from './CameraButtons';
import axios from 'axios';
import 'react-html5-camera-photo/build/css/index.css'
require('dotenv').config();

/*
TO DO: Rewrite this entire component using this guide:
https://www.bignerdranch.com/blog/dont-over-react/
NOTES BELOW

-------React file objects and blobs-------
The browser provides access to read in the file contents in a few formats like a String or ArrayBuffer, but each image could be 5 MB; drop 10 in the browser and you have 50 MB strings in memory!

So instead of directly returning a String or ArrayBuffer, the browser returns a Blob object. A Blob is essentially a pointer to a data source—it could point to a file on disk, an ArrayBuffer, streaming data, etc. Specifically, the e.dataTransfer.files array holds one or more File objects, which are Blobs with some extra metadata. File objects come with a few more properties, like the source file’s name.

To display the image in the DOM, e.g. with an <img /> tag, you can ask the browser for an ephemeral URL to the Blob object. This URL will only be valid while the tab is open:

  ...
  let file = e.dataTransfer.files[0]
  let url = URL.createObjectURL(file)
  console.log(url)

You can use a blob: URL wherever you would put any other URL—like:
  http://localhost:3000/images/logo.png
—and it just works!

---------- How to use blob: URLs in React ----------

Here’s a simple React app that accepts a dropped image and renders it on screen:

class App extends Component {
  state = { file: null }

  onDrag = event => {
    event.preventDefault()
  }

  onDrop = event => {
    event.preventDefault()
    let file = event.dataTransfer.files[0]
    this.setState({ file })
  }

  render() {
    let { file } = this.state
    let url = file && URL.createObjectURL(file)

    return (
      <div onDragOver={this.onDrag} onDrop={this.onDrop}>
        <p>Drop an image!</p>
        <img src={url} />
      </div>
    )
  }
}

The App component starts without any file; when an image file is dropped onto the <div> element, it updates the state and rerenders with a Blob URL. Easy peasy!

------------------------------------------------------------
------------------------------------------------------------
OLD CODE TO REPLACE

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
/*
