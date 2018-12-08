import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import GameRoomCard from "./GameRoomCard";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class PaperSheet extends Component {
  constructor(props) {
    super();
     const { classes } = props;
      this.state= {
        location: {}
    }
  }

  componentWillMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        //this.setState({location:postion})
        console.log(position);
      });
    }else{
      console.error("This browser does not support geolocation");
    }
  }

render () {
  return (
    <div>
      <Paper elevation={1}>
        <Typography variant="h3" component="h3" align="center">
          Game Room
        </Typography>
        <GameRoomCard />
      </Paper>
    </div>
  );
}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
