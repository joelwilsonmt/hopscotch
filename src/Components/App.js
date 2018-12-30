import React from "react";
import GameRoom from "./GameRoom/GameRoom";
import ChallengesWrapper from "./Challenges/ChallengesWrapper";
// import Challenges from "./Challenges/Challenges";
// import Map from "./Map/Map";
import Camera from "./Camera/Camera";
import CircuitReview from "./CircuitReview/CircuitReview";
import OpeningScreen from "./OpeningScreen/OpeningScreen";
import MainAppBar from "./Utilities/MainAppBar";
// import GameProvider from "./Contexts/GameContext";
// import {GameContext} from "./Contexts/GameContext";
import {createMuiTheme} from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Background from './Images/circuit4.jpg';
   
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#448AFF',
      contrastText: '#eeeeee',
    },
    secondary: {
      main: '#4CAF50',
      contrastText: '#eeeeee',
    }
    // secondary1: {
    //   main: '#C62828',
    //   contrastText: '#eeeeee',
    // },
  },
  typography: {
    fontFamily: 'Andale Mono',
    text: '#ffffff'
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: this.props.value.screen,
    }
  }

  componentDidMount(){
    document.body.style.backgroundImage = `url(${Background})`;
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
