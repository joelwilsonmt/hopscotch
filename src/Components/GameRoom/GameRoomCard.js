import React from "react";
import { BrowserRouter as  Link } from "react-router-dom";
import CountDown from "../Utilities/CountDown";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";





const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  CountDown: {
    alignItems: "center"
  }
};

class SimpleCard extends React.Component {
  constructor(props) {
    super()
    this.State={

    }
  }


  render() {
    return (
      <Card>
        <CardContent>
          <Typography>
          Circuit starts in <CountDown />
          </Typography>
          <br />
          <Typography color="textSecondary" gutterBottom align="center">
            Location
          </Typography>
          <Typography variant="h6" component="h2" align="center">
            Missoula
          </Typography>
          <Typography color="textSecondary" align="center">
            Players in Lobby <br /> 7 of 8
          </Typography>
          <Typography component="p" align="center">
            10 Challenges to be completed
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/Lobby/">
            <Button size="small" justify="center">
              Join Circuit
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
