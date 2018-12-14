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
import {UserContext} from "../Contexts/UserContext";
import UserProvider from "../Contexts/UserContext";

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
  state = {
    value: 0
  };

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
              <Tab label="CHALLENGES" component={Link} to="/Challenges" />
              <Tab label="MAP" component={Link} to="/MapContainer" />
            </Tabs>
          </AppBar>
          <Switch>
            <Route path="/Challenges/" component={ItemOne} />
            <Route path="/MapContainer" component={ItemTwo} />
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
      <div>
        <ExpansionPanels />
      </div>
    </Paper>

  );
  }


function ItemTwo(theme) {
  return (
    <Paper>
      <div>
        <MapContainer />
      </div>
    </Paper>
  );
}

export default withStyles({ withTheme: true })(FullWidthTabs);
