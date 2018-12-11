import React from 'react';
import axios from "axios";

/*
The UserContext context is a React context object that has a
Provider component and a Consumer component

The Provider component is configured in this file - it gives anything that
is wrapped in it access to its state, which contains two important properties

When a Consumer component accesses
<UserContext.Consumer>
  {(session) => (
    //the user session object is available here
  )}
</UserContext.Consumer>

In the user session object there is placeholder data to initialize the session
(for example username is 'not logged in'). In addition, as defined in this file,
the user session object exposed by the UserContext.Consumer has a method to set
its own state with a user's information retrieved by a Mongoose/MongoDB id axios put call (essentially taking the user session cookie and synchronizing the user data on the client side with all the server data).

The important thing about this is that it updates any and all child components
of the provider when
  session.updateUser(this.state.id)
is called

TODO is to make it so the axios call contained in the updateUser() method also
returns the current circuit object of the user



*/


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
              user: res.data,
              circut: res.circuit
          });//closes set state
          console.log("set state complete, user: ", this.state.user.username);
        });//closes .then()
      };//closes updateUser


    //filling in the constructor with placeholders so react doesn't crash trying to render null data:
    //these placeholders are overwritten with the updateUser Server call
    this.state = {
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
