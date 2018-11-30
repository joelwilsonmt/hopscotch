import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'


export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
            lat: 46.86028,
            lng: -113.98278
          }}
        zoom={13}>
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyD81lHDGkpb3CORrbtfarHe44zpXnKtJu8')
})(MapContainer)
