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
        console.log("get user handled", res.data.username);
        if(err){console.log(err);}
        this.setState(
          {
            session: {
              user: res.data,
              circut: res.circuit
            }
          });//closes set state
          console.log("set state complete, user: ", this.state.session.user.username);
        });//closes .then()
      };//closes updateUser


    //filling in the constructor with placeholders so react doesn't crash trying to render null data:
    //these placeholders are overwritten with the updateUser Server call
    this.state = {
      session: {
        //this user object is the copy of what is in the server every time
        //the Provider's passed value={this.state} .updateUser(userId) method
        //is accessed
        user: {
          username: 'Not logged in',
          current_user_location: {
            type: "",
            coordinates: []
          }, //set in addUser and updateUserLocation
          user_session_boundary: {
            here_api_format: [] //only need one format of bounding box for Here API and matchmaking
          },
          challenges_completed: [], //id's of challenges completed, I don't think we need this
          circuits_participated:[]
        }
      },
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
