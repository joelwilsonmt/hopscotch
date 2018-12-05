import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'


export class MapContainer extends React.Component {
  render() {
    const style = {
      width: '344px',  //change
      height: '400px'  //change
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



//{WaGriz - 46.8646461, -113.9814976
//Old Milwaukee - 46.8675,-113.998056
//Bayern - 46.872656  -114.020187
//Library – 46.869837   -113.990976
//Jellystone – 46.960769   -114.135258
