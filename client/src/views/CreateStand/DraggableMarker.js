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
  
const DraggableMarker = ({ choiserLocate }) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(choiserLocate)
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
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
}

export default DraggableMarker
