import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    MapConsumer,
    useMap,
  } from "react-leaflet";
  import MarkerClusterGroup from 'react-leaflet-markercluster';

const ResultsLayer = ({ results, choiserLocate }) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(null)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        }, 
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
        <MarkerClusterGroup>
              {results && results.map((locate, id) => {
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

          return(
          <Marker
            key={id}
            draggable={draggable}
            eventHandlers={eventHandlers}
            ref={markerRef}
            position={[lat, lon]}
            opacity={0.6}>
            <Popup>
            <span onClick={toggleDraggable}>
            <h3>{primeName}</h3>
              <p>{`${cityName}, ${country} ${zip ? zip : ""}`}</p>
              <p>{`${lat}, ${lon}`}</p>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
              
            </Popup>
          </Marker>
        )})
        }
  <Marker position={[49.8397, 24.0297]} />
  <Marker position={[52.2297, 21.0122]} />
  <Marker position={[51.5074, -0.0901]} />

        </MarkerClusterGroup>
    )
}

export default ResultsLayer
