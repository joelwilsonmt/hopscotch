import React from 'react';
import {GameContext} from "../Contexts/GameContext";
import Challenges from "./Challenges";




class ChallengesWrapper extends React.Component {
  constructor(props) {
    super();

  }

  render() {
    return (

      <GameContext.Consumer>{
        (game) => (
          <Challenges value={game}/>
        )
      }</GameContext.Consumer>

    );
  }
}

export default ChallengesWrapper;
