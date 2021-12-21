import React from "react";
import { useState, useEffect } from "react";
import Fullscreen from 'react-leaflet-fullscreen-plugin';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  useMap,
} from "react-leaflet";

import ResultsLayer from "./ResultsLayer";
import Fly from "../helpers/Fly";

const initialCenter = {
  lat: 40.668963,
  lng: -73.942792,
};

const initialIcon = L.icon({
  iconUrl: '/asset/images/icon_770-removebg-preview.png',
  // shadowUrl: 'leaf-shadow.png',

  iconSize:     [80, 80], // size of the icon
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


const initialZoom = 16;

const MeinMap = ({ selectedResults, flyTriger, setflyTriger, results, setSelectedResults, setEditLocation }) => {
  const [change, setchange] = useState(false);
  
 
  const fulScreenOptions = {
    position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
    title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
    titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
    content: null, // change the content of the button, can be HTML, default null
    forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
    forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
  };


  return (
    <MapContainer
      className="map-cont"
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={initialCenter}
        icon={initialIcon}
      />
      {/* {results?.length && <ChangeView selectedResults={selectedResults} results={results} />} */}
      
      {/* <LocationMarker /> = need to change the event triger to onload map */}
      <ResultsLayer
        setSelectedResults={setSelectedResults}
        selectedResults={selectedResults}
        results={results}
        setEditLocation={setEditLocation}
      />
      {/* {choiserLocate
            ? <ResultsLayer results={results}/>
            :<DraggableMarker choiserLocate={choiserLocate}/>} */}
   { flyTriger && <Fly 
      results={results}
      selectedResults={selectedResults}
      flyTriger={flyTriger}
      setflyTriger={setflyTriger}
      initialZoom={initialZoom}
    />}
<Fullscreen
        eventHandlers={{
          enterFullscreen: (event) => console.log('entered fullscreen', event),
          exitFullscreen: (event) => console.log('exited fullscreen', event),
        }}
        {...fulScreenOptions}
      />    </MapContainer>
  );
};

export default MeinMap;
