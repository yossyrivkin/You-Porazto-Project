import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
      } from "react-leaflet";

const StandMap = ({ location }) => {

  const locationObj = {
    lat: location.coordinates[1],
    lng: location.coordinates[0],
  }
  return (
    <>
      <Paper sx={{
          // width: ,
          alignContent: 'senter'
      }}>
        <MapContainer
          className="map-cont"
          center={locationObj}
          zoom={18}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={locationObj}
          >
          </Marker>{" "}
        </MapContainer>
      </Paper>
    </>
  );
};

export default StandMap;
