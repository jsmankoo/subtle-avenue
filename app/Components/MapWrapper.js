import React, {createClass} from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

const MapWrapper = createClass({
  render() {
    const {height} = this.props;
    const position = [43.645574, -79.380870];
    return (
      <div className="MapWrapper">
        <Map center={position} zoom={16} style={{height:height}}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <CircleMarker center={position} color='red' radius={20} fillOpacity={1} />
        </Map>
      </div>
    );
  }
});

export default MapWrapper;
