import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

function SimpleBadge(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static" className={classes.margin}>
        <Toolbar>
          <Tab
            color="inherit"
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={4}>
                TEAM ONE
              </Badge>
            }
          />
          <Tab
            label={
              <Badge className={classes.padding} color="secondary" badgeContent={6}>
                TEAM TWO
              </Badge>
            }
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBadge);
