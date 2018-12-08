import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

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
    for (var i=0; i < challangeArr.length; i++) {
      challengeMarkers.extend(challangeArr[i]);
    }


    return (
      <Map
        google={this.props.google}
        style={mapStyle}
        initialCenter={{
            lat: 46.86028,
            lng: -113.98278
          }}
        zoom={13}
        disableDefaultUI={true}
        zoomControl={true}
        // mapTypeControl={false}
        // scaleControl={false}
        // streetViewControl={false}
        // rotateControl={false}
        // fullscreenControl={false}
        challengeMarkers={challengeMarkers}>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD81lHDGkpb3CORrbtfarHe44zpXnKtJu8')
})(MapContainer)
