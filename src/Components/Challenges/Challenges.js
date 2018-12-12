import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../Utilities/AppBar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ExpansionPanels from "./ExpansionPanels";
import BottomNav from "../Utilities/BottomNav";
import {UserContext} from "../Contexts/UserContext";
import UserProvider from "../Contexts/UserContext";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});


class PaperSheet extends React.Component  {
  constructor(props){
    console.log(props);
    super(props);
    this.state = {
      _id: this.props.id
    };
  }
  render(){
  return (
    <UserProvider>
      <AppBar />
      <Paper  elevation={1}>
        <Typography variant="h5" component="h3" align="center">
          CHALLENGES: {this.state._id}
        </Typography>
        <br />
        <br />
        <ExpansionPanels />
      </Paper>
      <BottomNav />
    </UserProvider>
  );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
