import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import MainAppBar from "../Utilities/MainAppBar";
import ExpansionPanels from "./ExpansionPanels";
import Chat from "./Chat";
import MapContainer from "../Map/MapContainer";
import {GameContext} from "../Contexts/GameContext";
import io from 'socket.io-client';
import Camera from "../Camera/Camera";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';


//const socket = io('localhost:3001/');

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class Challenges extends React.Component {
  constructor(props) {
    super();
    this.socket = io(process.env.REACT_APP_BACK_END_SERVER);
    this.socket.on('RECEIVE', data => {
      var unread = this.state.unreadMessages;
      addMessage(data);
      if (data.username === this.state.username){
        return;
      }
      if(this.state.value !== 'chat'){
        unread++;
      }
      this.setState({
        messageSnackBarOpen: true,
        unreadMessages: unread
      });
    });
    const addMessage = data => {
      this.setState({
        messages: [...this.state.messages, data]
      });
    };
    this.resetBadge = () => {
      this.setState({
        unreadMessages: 0
      });
    }
    this.sendMessage = (e) => {
      console.log("sending message to server");
      e.preventDefault();
      this.socket.emit('SEND', {
        username: this.state.username,
        message: this.state.message
      });
      this.setState({
        message: ''
      });
    };
    this.onFormChange = (e) => {
        this.setState({
          message: e
        })
    };
    this.state = {
      value: 'challenges',
      messageSnackBarOpen: false,
      //chat stuff:
      username: 'Username not set',
      message: '',
      messages: [],//sets it so that when screen opens, challenges tab has focus
      unreadMessages: 0
    }
  }
  componentWillMount() {
    //make sure to set the challenge chat username once the component mounts
    this.setState({
      username: this.props.value.user.username
    });
  }
  componentDidMount() {
    //join the room via the socket instance living in Challenge's state
    //that means the socket (or methods that affect it) can be passed through props
    //to the chat room tab
    this.socket.emit('joinRoom', this.props.value.circuit._id, this.state.username);
  }
  componentWillUnmount() {
    //terminate the socket once the user leaves the challenge screen
    this.socket.disconnect();
  }
  changeTab = (event, value) => {
    this.setState({ value });
  };


  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  //for snackbar:
  closeSnackBar = (event, reason) => {
    this.setState({ messageSnackBarOpen: false });
  };

  render() {
    const { classes, theme } = styles;
    const { value } = this.state;
    if (this.props.value.view === 'Camera'){
      return (
        <div>
          <GameContext.Consumer>{
              (game) => (
          <Camera value={game}/>
          )}</GameContext.Consumer>
        </div>
      );
    }
    else{
      return (
          <div >
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.changeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab value="challenges" label="CHALLENGES"  />
                <Tab value="map" label="MAP" />
                {(this.state.unreadMessages > 0) ?
                <Tab value="chat" label={
                    <Badge className="chat-badge" color="secondary" badgeContent={this.state.unreadMessages}>
                      CHAT
                    </Badge>}/> :
                <Tab value="chat" label="CHAT" />}
              </Tabs>
            </AppBar>
            {value === 'challenges' && <ChallengeList/>}
            {value === 'map' && <Map/>}
            {value === 'chat' && <Paper>
              <div>
                <GameContext.Consumer>{
                    (game) => (
                <Chat chat={this} value={game}/>
                )}</GameContext.Consumer>
              </div>
            </Paper>}
            {(this.state.messages.length > 0) ?
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.messageSnackBarOpen}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">
          <strong>{this.state.messages[this.state.messages.length-1].username}</strong>:   {this.state.messages[this.state.messages.length-1].message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />: ''}

          </div>
      );
    }
  }
}


function ChallengeList(theme) {
  return (
    <Paper>
      <GameContext.Consumer>{
          (game) => (
            game.circuit.challenges.map(function(challenge, i){
              return <ExpansionPanels value={challenge} key={i} listId={i} />
            })
      )}</GameContext.Consumer>
    </Paper>

  );
}


function Map(theme) {
  return (
    <Paper>
      <div>
        <GameContext.Consumer>{
            (game) => (
        <MapContainer value={game}/>
        )}</GameContext.Consumer>
      </div>
    </Paper>
  );
}
function ChatF(props) {
  return (
    <Paper>
      <div>
        <GameContext.Consumer>{
            (game) => (
        <Chat chat={props.chat} value={game}/>
        )}</GameContext.Consumer>
      </div>
    </Paper>
  );
}

export default Challenges;
