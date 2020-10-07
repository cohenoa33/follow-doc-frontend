import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";

export class MapContainer extends React.Component {
  render() {
    console.log(process.env.GOOGLE_API_KEY);
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div></div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
