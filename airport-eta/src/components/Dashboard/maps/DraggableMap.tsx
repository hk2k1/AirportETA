"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
//   background: "#f0f0f0"
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const DraggableMap = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 600, height: 400 });
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
        center: [103.91289, 1.413576],
        zoom: 17,
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

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.resize();
    }
  }, [size]);

  return (
    <div style={{ width: '100%', height: '90vh' }}>
        {/* <div
            className="map-container"
            ref={mapContainerRef}
            style={{ height: '100px', width: '100px' }}
        >
      </div> */}
    <Rnd
      style={style}
      bounds={"window"}
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
    >
      {/* <div
            className="map-container"
            ref={mapContainerRef}
            style={{ height: '100%', width: '100%' }}
        >
      </div> */}
      <div className="flex flex-col w-full h-full">
          <div className="bg-accent p-2 font-bold text-center">
            T1 THA-1:46 THA-2:8 THA-3:2 SC:4
          </div>
          <div
            className="map-container flex-grow"
            ref={mapContainerRef}
          ></div>
        </div>
    </Rnd>
    </div>
  );
};

export default DraggableMap;