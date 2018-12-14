import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ProofButton from './ProofButton';
import {GameContext} from "../Contexts/GameContext";


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
      <GameContext.Consumer>{
          (game) => (

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>


            {
            (game.circuit.challenges.length > 1) ?
            game.circuit.challenges[1].full_challenge_text:
            'Cant find circuit'
            }


          </Typography>
        </ExpansionPanelSummary>
        <Typography>
          {
          (game.circuit.challenges.length > 1) ?
          'Location: ' + game.circuit.challenges[1].location_gate.name:
          'Cant find circuit'
          }
        </Typography>
        <Typography>
          {
          (game.circuit.challenges.length > 1) ?
          'Address: ' + game.circuit.challenges[1].location_gate.address:
          'Cant find circuit'
          }
        </Typography>
        <ExpansionPanelActions>
          <ProofButton />
        </ExpansionPanelActions>
      </ExpansionPanel>
    )}</GameContext.Consumer>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
