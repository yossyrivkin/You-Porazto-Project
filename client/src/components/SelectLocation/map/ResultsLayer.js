import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  useMap,
} from "react-leaflet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { List, Box, Button } from "@mui/material";
import EditLocationAltIcon from "@mui/icons-material/Streetview";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

const locationIcon = L.icon({
  iconUrl: "/asset/images/locationR.png",
  iconSize: [50, 50], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const selectedLocationIcon = L.icon({
  iconUrl: "/asset/images/primaryLocation.png",
  iconSize: [50, 50], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const ResultsLayer = ({
  results,
  selectedResults,
  setSelectedResults,
  setEditLocation,
}) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(null);
  const markerRef = useRef(null);

  return (
    <>
      {/* <MarkerClusterGroup> */}
      {results &&
        results.map((locate, id) => {
          const { road, town, country, city, state, village, zip } = locate.address;
          const { display_name, lat, lon, place_id } = locate;
          const primeName = road ? road : display_name;
          const cityName = city
            ? city
            : town
            ? town
            : village
            ? village
            : state;

          return (
            <Marker
              key={id}
              icon={
                selectedResults === id ? selectedLocationIcon : locationIcon
              }
              // draggable={draggable}
              // eventHandlers={eventHandlers}
              // ref={markerRef}
              position={[lat, lon]}
              // opacity={0.6}
            >
              <Popup>
                <span
                //   onClick={() => {
                //   setSelectedResults(id);
                // }}
                >
                  <h3>{primeName}</h3>
                  <p>{`${cityName}, ${country} ${zip ? zip : ""}`}</p>
                  <p>{`${lat}, ${lon}`}</p>
                  <Button
                    variant="contained"
                    onClick={(id) => {
                      setSelectedResults(id);
                      setEditLocation(id);
                    }}
                    endIcon={<EditLocationAltIcon />}
                  >
                    Edit this location
                  </Button>
                </span>
              </Popup>
            </Marker>
          );
        })}
      {/* </MarkerClusterGroup> */}
    </>
  );
};

export default ResultsLayer;
