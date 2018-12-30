import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {UserContext} from "../Contexts/UserContext";
import {GameContext} from "../Contexts/GameContext";

import axios from "axios";

var dotenv = require('dotenv').config();
const BACK_END_SERVER = 'http://localhost:3001/';

export default class FormDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      userNameInputValue: '',
      idSearch: '',
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

  updateIdSearchValue = (e) => {
    this.setState({
      idSearch: e.target.value
    });
  }

  submitUserToServer = () => {
    console.log("add user accessed for " + this.state.userNameInputValue);
    var userObject = {
      username: this.state.userNameInputValue,
      longitude: this.state.location.coords.longitude,
      latitude: this.state.location.coords.latitude
    };
    const addUser = process.env.REACT_APP_BACK_END_SERVER + 'addUser';
    //must use fat arrow function in callback to bind FormDialog's this
    //to inside the function itself:
    axios.post(addUser, userObject).then((res, err) => {
      if(err) {console.error(err);}
        console.log("passed value prop: ", this.props.value);
        console.log("Add user server response (should be user id):", res.data);
        //this.props.value.updateUser(res.data);
        //this.props.value.setScreen('GameRoom');
        this.props.value.updateUserAndSetScreen(res.data, 'GameRoom');
    });/*.then(() => {

    });*/
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary"
          Button onClick={this.handleClickOpen}>
          GET STARTED!
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ENTER USER NAME</DialogTitle>
          <DialogContent>
            <TextField
              value={this.state.userNameInputValue}
              onChange={this.updateUserNameInputValue}
              autoFocus
              margin="dense"
              id="name"
              label="NAME"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              size="small"
              justify="center"
              onClick={() => {
                this.handleClose()
                this.submitUserToServer()
                }}>
              SUBMIT
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={this.handleClose}>
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
