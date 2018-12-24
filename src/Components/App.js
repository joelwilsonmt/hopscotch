import React, {Component}  from "react";
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
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const theme = createMuiTheme({
  /*palette: {

    Secondary: {
      light: '#8664ea',
      main: '#5138b7',
      dark: '#0d0d86',
      contrastText: '#ffffff',
    },
    primary: {
      light: '#ed51ea',
      main: '#b700b7',
      dark: '#830086',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '-apple-system',
  },
*/});




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
            <MuiThemeProvider theme={theme}>
             <MainAppBar/>
              <OpeningScreen/>
            </MuiThemeProvider>
            </div>
          );
        }
        else if (this.props.value.screen === 'GameRoom'){
          return (
            <div>
            <MuiThemeProvider theme={theme}>
              <MainAppBar/>
              <GameRoom/>
              </MuiThemeProvider>
            </div>
          );
        }
        else if (this.props.value.screen === 'Challenges'){
          return (
            <div>
            <MuiThemeProvider theme={theme}>
              <MainAppBar/>
              <ChallengesWrapper/>
              </MuiThemeProvider>
            </div>
          );
        }
        else if (this.props.value.screen === 'Camera'){
          return (
            <div>
            <MuiThemeProvider theme={theme}>
              <MainAppBar/>
              <Camera/>
              </MuiThemeProvider>
            </div>
          );
        }
        else if (this.props.value.screen === 'CircuitReview'){
          return (
            <div>
            <MuiThemeProvider theme={theme}>
              <MainAppBar/>
              <CircuitReview/>
              </MuiThemeProvider>
            </div>
          );
        }



        else {
          return(
            <div>
            <MuiThemeProvider theme={theme}>
              <MainAppBar/>
              <h1>Sorry, Cannot Find Page</h1>
              </MuiThemeProvider>
            </div>
          );
        }
      }

}


export default App;
