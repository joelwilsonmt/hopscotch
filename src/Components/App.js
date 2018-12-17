import React from "react";
import GameRoom from "./GameRoom/GameRoom";
import CountDown from "./Utilities/CountDown";
import ChallengesWrapper from "./Challenges/ChallengesWrapper";
import Challenges from "./Challenges/Challenges";
import Map from "./Map/Map";
import Camera from "./Camera/Camera";
import CircuitReview from "./CircuitReview/CircuitReview";
import OpeningScreen from "./OpeningScreen/OpeningScreen";
import MainAppBar from "./Utilities/MainAppBar";
import GameProvider from "./Contexts/GameContext";
import {GameContext} from "./Contexts/GameContext";

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        screen: this.props.value.screen,
      }
    }
    render() {
        if (this.props.value.screen === 'OpeningScreen') {
          return (

            <div>
            <MainAppBar/>
              <OpeningScreen/>
            </div>
          );
        }
        else if (this.props.value.screen === 'GameRoom'){
          return (
            <div>
              <MainAppBar/>
              <GameRoom/>
            </div>
          );
        }
        else if (this.props.value.screen === 'Challenges'){
          return (
            <div>
              <MainAppBar/>
              <Challenges/>
            </div>
          );
        }
        else if (this.props.value.screen === 'Camera'){
          return (
            <div>
              <MainAppBar/>
              <Camera/>
            </div>
          );
        }
        else if (this.props.value.screen === 'CircuitReview'){
          return (
            <div>
              <MainAppBar/>
              <CircuitReview/>
            </div>
          );
        }



        else {
          return(
            <div>
              <MainAppBar/>
              <h1>Sorry, Cannot Find Page</h1>
            </div>
          );
        }
      }

}


export default App;
