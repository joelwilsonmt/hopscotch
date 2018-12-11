import React from 'react';
import axios from "axios";

export var UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    //TODO: add updateuser method:
    this.updateUser = (userId) => {
      console.log("updateUser accessed w/ uid: ", userId);
      const getUser = process.env.REACT_APP_BACK_END_SERVER + 'getUser';
      axios.put(getUser, {userId}).then((res,err) => {
        console.log("get user handled");
        if(err){console.log(err);}
        /*this.setState(
          {
            session: {
              user: res.user,
              circut: res.circuit
            }
          });*///closes set state
          console.log("set state complete, user: ", res);
        });//closes .then()
      };//closes updateUser

    this.state = {
      username: 'StateJoel',
      circuitname: 'Circuit Name',
      updateUser: this.updateUser
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
