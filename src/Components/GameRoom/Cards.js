import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CountDown from "./CountDown";

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

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          align="center"
        >
          Location of Circuit
        </Typography>
        <Typography variant="h5" component="h2" align="center">
          Missoula
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary"
          align="center"
        >
          Number of Players in Lobby
          <br />7 of 8
        </Typography>
        <Typography component="p" align="center">
          Ten Challenges to be Completed
        </Typography>
        Circuit will Start in <CountDown />
      </CardContent>
      <CardActions>
        <Button size="small" justify="center">
          Join Circuit
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
