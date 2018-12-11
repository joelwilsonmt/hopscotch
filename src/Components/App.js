import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameRoom from "./GameRoom/GameRoom";
import CountDown from "./Utilities/CountDown";
import Lobby from "./Lobby/Lobby";
import Challenges from "./Challenges/Challenges";
import Map from "./Map/Map";
import Camera from "./Camera/Camera";
import CircuitReview from "./CircuitReview/CircuitReview";
import OpeningScreen from "./OpeningScreen/OpeningScreen";
import AppBar from "./Utilities/AppBar";
import UserProvider from "./Contexts/UserContext";
import {UserContext} from "./Contexts/UserContext";

const App = () =>
<div>

    <AppBar />
    <OpeningScreen/>

</div>;

const AppRouter = () => (
    <UserProvider>
  <Router>
    <div>
      <UserContext.Consumer>{
          (userobj) => (
            <div>
            <Route path="/Challenges/" id={userobj.session.user._id} component={Challenges} />
            </div>
          )
        }</UserContext.Consumer>
      <Route path="/" exact component={App} />
      <Route path="/GameRoom/" component={GameRoom} />
      <Route path="/Lobby/" component={Lobby} />

      <Route path="/Map/" component={Map} />
      <Route path="/Camera/" component={Camera} />
      <Route path="/CircuitReview/" component={CircuitReview} />
      <Route path="/OpeningScreen/" component={OpeningScreen} />
    </div>
  </Router>
    </UserProvider>
);

export default AppRouter;
