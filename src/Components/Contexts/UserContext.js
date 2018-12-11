import React from 'react';

export var UserContext = React.createContext();

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    //TODO: add updateuser method:
    /*this.updateUser = (userId) => {
      axios.get(process.env.REACT_APP_BACK_END_SERVER + 'getUser', userId)
      .then((res,err) => {
        if(err){
          console.log(err);
        }
        this.setState(session: {
          user: res.user,
          circut: res.circuit
        });
      });
    }*/

    this.state = {
      username: 'StateJoel',
      circuitname: 'Circuit Name'
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
