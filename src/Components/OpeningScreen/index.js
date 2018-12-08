import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import HomeScreen from "./HomeScreen/HomeScreen";

function App() {
  return (
    <body background="https://spectrum.ieee.org/image/MzEwMTk5OA.jpeg">
    <div className="App">
      <h1>Circuit Breaker</h1>
      <img src="http://www.practicalphysics.org/images/PP_Electric_circuits.jpg" />
      <OpeningScreen />
    </div>
    </body>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
