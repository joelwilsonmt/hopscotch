import React from 'react';
import Button from "@material-ui/core/Button";
import {GameContext} from "../Contexts/GameContext";
import GameRoom from '../GameRoom/GameRoom';
import Camera from '../Camera/Camera';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ProofButton extends React.Component {
  constructor(props) {
    super(props);
    //this.handleClick.bind(this);
  }

  componentWillMount(){
    console.log("Proof button this at mount: ", this);

  }
  handleClick() {
    console.log("proof button clicked");
   console.log("Proof button this prop value at click", this.props.value);
  }

  render(){
    return (
      <div>
        <GameContext.Consumer>{
          (game) => (
            <Button
              variant="outlined"
              size="small"
              justify="center"
              color="primary"
              onClick={() => {
                game.setCurrentChallenge(this.props.value);
                game.setView('Camera');
              }}
            >
            Take Picture
            </Button>
          )
        }</GameContext.Consumer>
      </div>
    );
  }
}

export default ProofButton;
