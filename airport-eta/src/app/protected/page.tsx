"use client"
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGsyazEiLCJhIjoiY2xxZ2xreG5lMTRlczJxbWV2dzVuY2Z3aSJ9.Kbxi4KArMjnZ1Q2taCE0kg';
      const map = new mapboxgl.Map({
          container: mapContainerRef.current || '',
          style: 'mapbox://styles/mapbox/standard',
          center: [103.91289, 1.413576],
          zoom: 17,
      });
      mapRef.current = map;
      return () => map.remove();
  });

  return (
        <div
            className="map-container"
            ref={mapContainerRef}
            style={{ height: '100vh', width: '100vw' }}
        >
      </div>
  );
};

export default MapboxExample;