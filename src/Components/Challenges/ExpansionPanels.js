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

class SimpleExpansionPanel extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      withinDistance: false
    };
  }
  componentWillMount() {
    if((this.props.distance-1000).toFixed(1) < 1) {
      this.setState({
        withinDistance: true
      });
    }
  }
  render(){
    let challenge = this.props.value;
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>

            {
            (this.props.listId+1) + ") " + challenge.full_challenge_text
          } <strong>{(this.props.distance-1000).toFixed(1)} Miles away</strong>


          </Typography>
        </ExpansionPanelSummary>
        <Typography>
          {
          challenge.location_gate.name
        }
        </Typography>
        <Typography>
          {
          this.props.value.location_gate.address.replace(/<br\s*\/?>/gi, '. ')
          }
        </Typography>
        <Typography>
        { this.state.withinDistance ? <strong>You are within 1 mile of the objective! Take a Picture</strong>
          :
          <strong>You cannot submit! Get within 1 mile of the objective!</strong>}
        </Typography>
        <ProofButton disabled={!this.state.withinDistance} value={challenge} ArrayPosition={this.props.listId}/>
      </ExpansionPanel>
    </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
