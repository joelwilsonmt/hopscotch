import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DialogBox from "./DialogBox"
import Grid from '@material-ui/core/Grid';
import {UserContext} from "../Contexts/UserContext";

import {
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper}
        elevation={1}>
        <Typography variant="h1" gutterBottom>
          Circuit Breaker
        </Typography>
        <Typography variant="h3" gutterBottom>
          Click the button below to log in
        </Typography>
        <DialogBox />
          <UserContext.Consumer>{
              (session) => ( //can rewrite this as (userProviderState) => () if that's more clear
                <div>
                  <Typography variant="h4" gutterBottom>
                    User Name: {session.user.username}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    User west bound: {session.user.user_session_boundary.here_api_format[0]}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    Current User Circuit ID: {session.user.current_circuit_id}
                  </Typography>
                  <p>User ID: 5c0ff7bc64e17777e313ac23</p>
                  <p>User ID: 5c0ff7c864e17777e313ac24</p>
                  <p>User ID: 5c0ff7cf64e17777e313ac25</p>
                  <p>User ID: 5c0ff80e64e17777e313ac27</p>
                </div>
              )
            }</UserContext.Consumer>
      </Paper>

    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(PaperSheet);
