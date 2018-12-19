import React from 'react';
import axios from "axios";

/*

*/


export var RouterContext = React.createContext();

class RouterProvider extends React.Component {
  constructor(props) {
    super(props);
    this.setScreen = (screenName) => {
      console.log("Routing to screen ", screenName);
        this.setState(
          {
              screen: screenName
          });//closes set state
          console.log("Screen state set in provider:", this.state.screen);
    };//closes setScreen


    this.setView = (viewName) => {
      console.log("Changing view to ", viewName);
      this.setState({
          view: viewName
      });//closes set state

    };//closes setView
    this.state = {
        screen: 'OpeningScreen',
        view: '',
        setScreen: this.setScreen,
        setView: this.setView
    };
  }

  render() {
    //<UserProvider> component returns the <UserContext.Provider> object
    //with the value passing to anything inside of it the state contained
    //in the initial and subsequent setting of this Component's state
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default RouterProvider;
