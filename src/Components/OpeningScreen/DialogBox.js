import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import GameRoom from "../GameRoom/GameRoom";

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
