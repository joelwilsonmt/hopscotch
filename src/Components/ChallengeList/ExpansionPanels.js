import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import ProofButton from './ProofButton';

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Brief Description</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>Detailed information on what to do.</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Two</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Three</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Four</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Five</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Six</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Seven</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Eight</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Nine</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography />
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Challenge Ten</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
