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
import L from "leaflet";
import Fullscreen from "react-leaflet-fullscreen-plugin";


const editLocationIcon = L.icon({
  iconUrl: "/edit-location_PRIMARY.png",
  iconSize: [35, 45], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const fulScreenOptions = {
  position: "topleft", // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
  title: "Show me the fullscreen !", // change the title of the button, default Full Screen
  titleCancel: "Exit fullscreen mode", // change the title of the button when fullscreen is on, default Exit Full Screen
  content: null, // change the content of the button, can be HTML, default null
  forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
  forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
  fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
};


const FixedLocation = ({ standData, setStandData }) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setStandData({ ...standData, location: marker.getLatLng() })
        }
      },
    }),
    []
  );
  // const toggleDraggable = useCallback(() => {
  //   setDraggable((d) => !d);
  // }, []);

  return (
    <MapContainer
      className="map-pick-cont"
      center={standData.location}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={editLocationIcon}
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRef}
        position={standData.location}
        // opacity={0.6}
      >
        {/* <Popup>
            <span onClick={toggleDraggable}>
            <h3>{primeName}</h3>
              <p>{`${cityName}, ${country} ${zip ? zip : ""}`}</p>
              <p>{`${lat}, ${lon}`}</p>
              <p>{position}</p>
          </span>
              
            </Popup> */}
      </Marker>
      <Fullscreen
        eventHandlers={{
          enterFullscreen: (event) => console.log("entered fullscreen", event),
          exitFullscreen: (event) => console.log("exited fullscreen", event),
        }}
        {...fulScreenOptions}
      />

    </MapContainer>
  );
};

export default FixedLocation;
