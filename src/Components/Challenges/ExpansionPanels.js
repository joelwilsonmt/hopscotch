import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ProofButton from './ProofButton';
// import {GameContext} from "../Contexts/GameContext";


const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class SimpleExpansionPanel extends React.Component{
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("This props value at Expansion Panel Mount:", this.props.value);
  }

  render(){
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {
              (this.props.listId+1) + ") " + this.props.value.full_challenge_text
              }
            </Typography>
          </ExpansionPanelSummary>
          <Typography>
            {
            this.props.value.location_gate.name
            }
          </Typography>
          <Typography>
            {
            this.props.value.location_gate.address.replace(/<br\s*\/?>/gi, '. ')
            }
          </Typography>
          <ProofButton value={this.props.value} ArrayPosition={this.props.listId}/>
        </ExpansionPanel>
      </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
