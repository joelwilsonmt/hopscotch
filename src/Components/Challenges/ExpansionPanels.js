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
    this.state = ({
      isWithinDistance: false
    })
  }
  componentWillMount() {
    this.props.updateDistance();
    if((this.props.distance-1000) < 2) {
      this.setState({
        isWithinDistance: true
      });
    }
    console.log("expansion panel order at mount: ", this.props.order);

  }
  render(){
    let challenge = this.props.value;
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>

            {

            (this.props.listId+1) + ") " + this.props.value.full_challenge_text + " "
            }



          </Typography>
          <Typography>
            Distance:<strong>
            {
            (this.props.distance).toFixed(2)
          }</strong>: order: {this.props.order}


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
          {
            (this.props.distance < 2) ? 'You can take a selfie!' : 'You can take a picture, but it wont work'
          }
        </Typography>
        <ProofButton value={this.props.value} order={this.props.order}/>
      </ExpansionPanel>
    </div>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);
