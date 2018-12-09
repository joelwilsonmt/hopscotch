import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import HomeScreen from "./HomeScreen/HomeScreen";

function App() {
  return (
    <body background="http://circuits-central.com/wp-content/uploads/2015/09/home-2.jpg">
    <div className="App">
      <h1>Circuit Breaker</h1>
      <img src="http://www.practicalphysics.org/images/PP_Electric_circuits.jpg" />
      <HomeScreen />
    </div>
    </body>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
