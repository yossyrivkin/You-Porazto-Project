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

const FixedLocation = ({  position, setPosition }) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
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
      className="map-cont"
      center={position}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        ref={markerRef}
        position={position}
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
      </Marker>{" "}
    </MapContainer>
  );
};

export default FixedLocation;
