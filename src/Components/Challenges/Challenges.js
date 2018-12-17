import React from 'react';
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import ExpansionPanels from "./ExpansionPanels";
import MapContainer from "../Map/MapContainer";
import {GameContext} from "../Contexts/GameContext";
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('localhost:3001/');

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};


class FullWidthTabs extends React.Component {
  constructor(props) {
    super();
    this.state = {
    }
  }
  componentWillMount() {
    socket.emit('joinRoom', '1234567');
  }
  componentWillUnmount() {
    socket.disconnect();
    //socket.emit('joinRoom', this.props.value.user.current_circuit_id);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };


  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <MainAppBar />
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="CHALLENGES" component={Link} to="/Challenges/" />
              <Tab label="MAP" component={Link} to="/MapContainer/" />
            </Tabs>
          </AppBar>
          <Switch>
            <Route path="/Challenges/" component={ItemOne} />
            <Route path="/MapContainer/" component={ItemTwo} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function ItemOne(theme) {
  return (
    <Paper>
      <GameContext.Consumer>{
          (game) => (
            game.circuit.challenges.map(function(challenge, i){
              return <ExpansionPanels value={challenge} key={i} listId={i} />
            })
      )}</GameContext.Consumer>
    </Paper>

  );
  }


function ItemTwo(theme) {
  return (
    <Paper>
      <div>
        <GameContext.Consumer>{
            (game) => (
        <MapContainer value={game}/>
        )}</GameContext.Consumer>
      </div>
    </Paper>
  );
}

export default withStyles({ withTheme: true })(FullWidthTabs);
