import React, {createClass} from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

const MapWrapper = createClass({
  render() {
    const {height, uberData, pickupData, dropoffData} = this.props;
    const position = [43.645574, -79.380870];
    return (
      <div className="MapWrapper">
        <Map center={position} zoom={13} style={{height:height}}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            pickupData && uberData.pickup.map(({lat, long}, index)=>(
              <CircleMarker key={index} center={[lat, long]} color='green' radius={5} fillOpacity={1} />
            ))
          }
          {
            dropoffData && uberData.dropoff.map(({lat, long}, index)=>(
              <CircleMarker key={index} center={[lat, long]} color='red' radius={5} fillOpacity={1} />
            ))
          }
        </Map>
      </div>
    );
  }
});

export default MapWrapper;
