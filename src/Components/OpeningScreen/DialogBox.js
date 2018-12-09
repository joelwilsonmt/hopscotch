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
      userNameInputValue: ''
    };
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
    var userObject = {};
    userObject.username = this.state.userNameInputValue;
    userObject.longitude = -122.3321;
    userObject.latitude = 47.6062;
    console.log(userObject);
    const addUser = process.env.REACT_APP_BACK_END_SERVER + 'addUser';
    console.log(addUser);
    axios.post(addUser, userObject, function(res, err){
      if(err) {console.error(err);}
      else {
        console.log(res);
      }
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
            <Link to="/GameRoom">
            <Button onClick={() => {
                this.handleClose()
                this.submitUserToServer()
                }
              }
              color="primary">
              Submit
            </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
