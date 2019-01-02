import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class NoPage extends React.Component {

  render(){
    return (
      <div height="100hv">
        <Paper>
          <Typography variant="h4">
            <p>Sorry, this page <br />could not be found</p>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default NoPage;
