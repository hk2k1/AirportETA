"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MoveDiagonal2 } from 'lucide-react';


interface DraggableMapProps {
    id: string;
    initialPosition: { x: number; y: number };
    initialSize: { width: number; height: number };
    center: [number, number];
    zoom: number;
    headerText: string;
    zIndex: number;
    onFocus: () => void;
  }

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const DraggableMap: React.FC<DraggableMapProps> = ({ 
    id, 
    initialPosition, 
    initialSize, 
    center, 
    zoom, 
    headerText,
    zIndex,
    onFocus,
  }) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  mapboxgl.accessToken = mapboxToken;


  useEffect(() => {
    if (!mapboxToken) {
      console.error('Mapbox token is not set');
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    
    const map = new mapboxgl.Map({
        container: mapContainerRef.current || '',
        style: 'mapbox://styles/mapbox/standard',
        center: center,
        zoom: zoom,
    });
    mapRef.current = map;

    //   map.on('load', () => {
    //     map.addSource('earthquakes', {
    //       type: 'geojson',
    //       data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
    //     });

    //     map.addLayer({
    //       id: 'earthquakes-layer',
    //       type: 'circle',
    //       source: 'earthquakes',
    //       paint: {
    //         'circle-radius': 4,
    //         'circle-stroke-width': 2,
    //         'circle-color': 'red',
    //         'circle-stroke-color': 'white'
    //       }
    //     });
    //   });

      map.addControl(new mapboxgl.FullscreenControl());
    //   map.addControl(new mapboxgl.GeolocateControl());

      mapRef.current = map;

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
          }
    };
  }, [center, zoom]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [size]);

return (
    <Rnd
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        zIndex: zIndex,
      }}
      bounds="window"
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(position);
      }}
      resizeHandleComponent={{ bottomRight: <MoveDiagonal2 /> }}
      onClick={onFocus}
    >
      <div className="flex flex-col w-full h-full">
        <div className="bg-accent p-2 font-bold text-center">
          {headerText}
        </div>
        <div
          id={`map-container-${id}`}
          className="map-container flex-grow"
          ref={mapContainerRef}
        ></div>
      </div>
    </Rnd>
  );
};

export default DraggableMap;