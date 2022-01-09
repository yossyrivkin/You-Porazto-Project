import React from "react";
import { useState, useEffect } from "react";
import Fullscreen from "react-leaflet-fullscreen-plugin";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import L from "leaflet";
import LocateControl from "react-leaflet-locate-control";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  useMap,
  Circle,
} from "react-leaflet";
import { Alert, Slide, Slider, Snackbar, Stack } from "@mui/material";
import ControllWrape from "./ControllWrape";
import { Box } from "@mui/system";

function LocationMarker({ radius }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      <Popup>You are here</Popup>
      <Circle center={position} radius={radius} />
    </Marker>
  );
}

const initialCenter = {
  lat: 40.668963,
  lng: -73.942792,
};

const initialIcon = L.icon({
  iconUrl: "/asset/images/icon_770-removebg-preview.png",
  // shadowUrl: 'leaf-shadow.png',

  iconSize: [80, 80], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const locationIcon = L.icon({
  iconUrl: "/current-location-2-256.png",
  iconSize: [40, 40], // size of the icon
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const initialZoom = 16;

const Maps = ({
  selectedResults,
  flyTriger,
  setflyTriger,
  results,
  setSelectedResults,
  setEditLocation,
}) => {
  const [change, setchange] = useState(false);
  const [alert, setAlert] = useState(false);
  const [radius, setradius] = useState(5000);

  const handleChangeRadius = (event, newValue) => {
    setradius(newValue);
  };

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const locateOptions = {
    position: "topright",
    strings: {
      title: "Show me where I am, yo!",
    },
    onActivate: () => {}, // callback before engine starts retrieving locations
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    const show = setTimeout(() => {
      setAlert(true);
    }, 1500);
    // setTimeout(() => {
    //   setAlert(false);
    // }, 7000);

    return () => {
      clearTimeout(show);
    };
  }, []);

  const fulScreenOptions = {
    position: "topleft", // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
    title: "Show me the fullscreen !", // change the title of the button, default Full Screen
    titleCancel: "Exit fullscreen mode", // change the title of the button when fullscreen is on, default Exit Full Screen
    content: null, // change the content of the button, can be HTML, default null
    forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
    forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
  };

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        autoHideDuration={6000}
        onClose={() => setAlert(false)}
      >
        <Alert
          onClose={() => setAlert(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Please click the 770 icon to find your exact location.
        </Alert>
      </Snackbar>
      <MapContainer
        style={{
          width: "100%",
          height: mobile ? `100hv` : `calc(100% - 65px)`,
          bottom: mobile ? "55px" : "65px",
          bottom: mobile ? "0px" : "0px",
          margin: 0,
        }}
        center={initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker radius={radius} />
        <Marker position={initialCenter} icon={initialIcon} />
        <Fullscreen
          eventHandlers={{
            enterFullscreen: (event) =>
              console.log("entered fullscreen", event),
            exitFullscreen: (event) => console.log("exited fullscreen", event),
          }}
          {...fulScreenOptions}
        />
        {/* <LocateControl options={locateOptions} /> */}
        <ControllWrape position="bottomleft">
          <Box sx={{ width: 400 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <img src='/distance-icon.png' width='34' height='34'></img>
              <Slider
                aria-label="Radius"
                defaultValue={radius}
                value={radius}
                valueLabelDisplay="auto"
                onChange={handleChangeRadius}
                min={100}
                max={150000}
        
              />
            </Stack>
          </Box>
        </ControllWrape>
      </MapContainer>
    </>
  );
};

export default Maps;
