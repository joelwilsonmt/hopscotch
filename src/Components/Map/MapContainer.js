import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const mapStyle = {
  width: '94vw',  //change
  height: '60vh'  //change
};

export class MapContainer extends React.Component {
  render() {

    var challangeArr = [
      { lat: 46.8646461, lng: -113.9814976 },
      { lat: 46.8675, lng: -113.998056 },
      { lat: 46.872656, lng: -114.020187 },
      { lat: 46.869837, lng: -113.990976 },
      { lat: 46.960769, lng: -114.135258 }
    ]

    var marker, i;

    var challengeMarkers = new this.props.google.maps.LatLngBounds();
    for (i=0; i < challangeArr.length; i++) {
      challengeMarkers.extend(challangeArr[i]);
    }


    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: 46.8646461, lng: -113.9814976 }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: 46.8646461, lng: -113.9814976 }}
          name = { 'Changing Colors Garage' }
        />
        <InfoWindow>
          <Paper>
            <Typography
              variant = 'headline'
              component = 'h4'
            >
              Changing Colors Garage
            </Typography>
            <Typography
              component = 'p'
            >
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD81lHDGkpb3CORrbtfarHe44zpXnKtJu8')
})(MapContainer)
