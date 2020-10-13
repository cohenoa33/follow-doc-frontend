import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";

export class MapContainer extends React.Component {
  render() {
    let myLatLng = { lat: this.props.lat, lng: this.props.lng };
    return (
      <div className="map-container">
        <Map
          initialCenter={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
          google={this.props.google}
          zoom={16}
          className="map-container"
          onClick={this.onMapClicked}
        >
          <Marker
            title="My Location"
            name={"Current location"}
            position={myLatLng}
            draggable={true}
          ></Marker>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
