import React from "react";
import { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  useMap,
} from "react-leaflet";

import DraggableMarker from "./DraggableMarker";
import LocationMarker from "./LocationMarker";
import ResultsLayer from "./ResultsLayer";

const defaultCenter = {
  lat: 40.669288,
  lng: -73.942924,
};
const secundCenter = {
  lat: 50.669288,
  lng: -63.942924,
};
const DEFAULT_ZOOM = 12;

const MeinMap = ({ selectedResults, flyTriger, setflyTriger, results, setSelectedResults }) => {
  const [change, setchange] = useState(false);
  const ChangeView = () => {
    const map = useMap();
    if (!selectedResults || !selectedResults) {
      console.log("no selected results");
      return;
    }
    // const { lat, lon } = selectedResults
    //     const initial = {
    //         lat: lat,
    //         lng: lon,
    //       }
    map.setView(defaultCenter, DEFAULT_ZOOM);
    console.log("change view");
    return null;
  };

  // useEffect(() => {
  //     setchange(true)
  //     return () => {
  //         setchange(false)
  //     }
  // }, [selectedResults])

  return (
    <MapContainer
      className="map-cont"
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* {results?.length && <ChangeView selectedResults={selectedResults} results={results} />} */}
      {/* <LocationMarker /> = need to change the event triger to onload map */}
      <ResultsLayer
        setSelectedResults={setSelectedResults}
        results={results}
      />
      {/* {choiserLocate
            ? <ResultsLayer results={results}/>
            :<DraggableMarker choiserLocate={choiserLocate}/>} */}
    { flyTriger && <MapConsumer>
        {(map) => {
          console.log("map center:", map.getCenter());
            console.log(selectedResults);    

          if (flyTriger && selectedResults !== null) {
            map.flyTo({
                lat: results[selectedResults].lat,
                lng: results[selectedResults].lon,
              },  DEFAULT_ZOOM);
            console.log('fly');
            setflyTriger(false);
          }
          return null;
        }}
      </MapConsumer>}
    </MapContainer>
  );
};

export default MeinMap;
