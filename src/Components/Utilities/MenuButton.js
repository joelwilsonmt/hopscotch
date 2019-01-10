import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {GameContext} from "../Contexts/GameContext";
import ContactUs from "../ContactUs/ContactUs";

class SimpleMenu extends React.Component {
  constructor () {
    super();
    this.state = {
      disableSubmit: false
    }
  }
     handleClick = () => {
     this.setState({
      disableSubmit: true

    })
}


    // }


  render() {
    return (
      <div>
        <IconButton

          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"

          onClose={this.handleClose}
        ><GameContext.Consumer>{
            (game) => (
          <MenuItem onClick={
            (event) => {
              this.handleClose();
              game.setView('ContactUs')
            }}>
            CONTACT US
          </MenuItem>
        )
        }</GameContext.Consumer>



        </Menu>
      </div>
    );
  }
}



export default SimpleMenu;
