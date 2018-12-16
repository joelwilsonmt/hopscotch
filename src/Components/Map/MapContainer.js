import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import {GameContext} from "../Contexts/GameContext";

const mapStyle = {
  width: '94vw',  //change
  height: '60vh'  //change
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  };

  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    const mapCenterLat = (this.props.value.user.user_session_boundary.here_api_format[1] + this.props.value.user.user_session_boundary.here_api_format[3]) / 2;
    const mapCenterLng = (this.props.value.user.user_session_boundary.here_api_format[0] + this.props.value.user.user_session_boundary.here_api_format[2]) / 2;
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClicked }
        zoom = { 12 }
        initialCenter = {{
          lat: mapCenterLat,
          lng: mapCenterLng
        }}
      >
      {this.props.value.circuit.challenges.map((challenge, i) => {
          return <Marker
                    onClick={this.onMarkerClick}
                    key={i}
                    title = {challenge.location_gate.name}
                    position = {
                      {
                        lat:challenge.location_gate.position[0],
                        lng:challenge.location_gate.position[1]
                      }
                    }
                    name = {challenge.location_gate.name}
                    address = {challenge.location_gate.address}
                    challengeText = {challenge.full_challenge_text}
                  />
        })}
        {this.props.value.circuit.challenges.map((challenge, i) => {
            return <InfoWindow
                    key={"info" + i}
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                      <div>
                        <h1>{this.state.selectedPlace.challengeText}</h1>
                        <h2>{this.state.selectedPlace.name}</h2>
                        <h2>Address: {this.state.selectedPlace.address}</h2>
                      </div>
                  </InfoWindow>
          })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD81lHDGkpb3CORrbtfarHe44zpXnKtJu8')
})(MapContainer)
