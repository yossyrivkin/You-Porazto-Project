import React from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    MapConsumer,
    useMap,
  } from "react-leaflet";
  
const Fly = ({ results, selectedResults, flyTriger, setflyTriger, initialZoom }) => {
    return (
        <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
          console.log(selectedResults);    

          if (flyTriger && results[selectedResults]) {
            map.flyTo({
                lat: results[selectedResults].lat,
                lng: results[selectedResults].lon,
              },  initialZoom);
            console.log('fly');
            setflyTriger(false);
          }
          return null;
        }}
      </MapConsumer>
    )
}

export default Fly
