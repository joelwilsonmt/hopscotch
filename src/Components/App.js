import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import GameRoom from "./GameRoom/GameRoom";
import CountDown from "./Utilities/CountDown";
import Lobby from "./Lobby/Lobby";
import Challenges from "./Challenges/Challenges";
import Map from "./Map/Map";
import Camera from "./Camera/Camera";
import CircuitReview from "./CircuitReview/CircuitReview";


let imgUrl = './Images/circuit1.jpg'
let styles = {
    root: {
       backgroundImage: `url(${ imgUrl })`,
       backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center',
  }
}

const App = () => <h2>Home</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/GameRoom/">Game Room</Link>
          </li>
          <li>
            <Link to="/Lobby/">Lobby</Link>
          </li>
          <li>
            <Link to="/Challenges/">Challenges</Link>
          </li>
          <li>
            <Link to="/Map/">Map</Link>
          </li>
          <li>
            <Link to="/Camera/">Camera</Link>
          </li>
          <li>
            <Link to="/CircuitReview/">Circuit Review</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={App} />
      <Route path="/GameRoom/" component={GameRoom} />
      <Route path="/Lobby/" component={Lobby} />
      <Route path="/Challenges/" component={Challenges} />
      <Route path="/Map/" component={Map} />
      <Route path="/Camera/" component={Camera} />
      <Route path="/CircuitReview/" component={CircuitReview} />
    </div>
  </Router>
);

export default AppRouter;
