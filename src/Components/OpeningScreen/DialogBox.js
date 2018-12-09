import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from "axios";
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import GameRoom from "../GameRoom/GameRoom";
var dotenv = require('dotenv').config();
const BACK_END_SERVER = 'http://localhost:3001/';

export default class FormDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      userNameInputValue: '',
      _id: ''
    };
  }
  // getUserLocation = () => {
  //
  // }
  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({location:position})

        console.log(this.state.location);
      });
    } else {
      console.error("Browser does not support Geolocation");
    }
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  updateUserNameInputValue = (e) => {
    this.setState({
            userNameInputValue: e.target.value
        });
  }
  submitUserToServer = () => {
    console.log("this at begining of server submit: " + this);
    var userObject = {};
    userObject.username = this.state.userNameInputValue;
    userObject.longitude = this.state.location.coords.longitude;
    userObject.latitude = this.state.location.coords.latitude;
    console.log(userObject);
    const addUser = process.env.REACT_APP_BACK_END_SERVER + 'addUser';
    console.log(addUser);
    var userId = '';
    //must use fat arrow function in callback to bind FormDialog's this
    //to inside the function itself:
    axios.post(addUser, userObject).then((res, err) => {
      if(err) {console.error(err);}
        console.log("Add user server response:");
        console.log(res.data);
        userId = res.data;
    }).then(() => {
      console.log("this should contain a value: " + userId);

      //TODO set user id state here and pass up to toppest parent
      this.setState({
        _id : userId
      });
      console.log("this is the user id in state: " + this.state._id);
    });
  }

  render() {
    return (
      <div>
      <Button variant="contained" color="primary"
        Button onClick={this.handleClickOpen}>Get Started</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Who Are You</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please give us a user name!
            </DialogContentText>
            <TextField
              value={this.state.userNameInputValue}
              onChange={this.updateUserNameInputValue}
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            {/*<Link to="/GameRoom">*/}
            <Button onClick={() => {
                this.handleClose()
                this.submitUserToServer()
                }
              }
              color="primary">
              Submit
            </Button>
          {/*</Link>*/}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
