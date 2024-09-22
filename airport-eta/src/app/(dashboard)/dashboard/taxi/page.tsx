// app/dashboard/taxi/page.tsx
"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import DraggableMap from "@/components/Dashboard/maps/DraggableMap"
import { dashboardConfig } from "@/config/dashboard";

interface MapConfig {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  center: [number, number];
  pitch?: number;
  bearing?: number;
  zoom: number;
  headerText: string;
  zIndex: number;
  geoJsonFile?: string;  // New property for GeoJSON file name
}

const initialMapConfigs: Omit<MapConfig, 'zIndex'>[] = [
  {
    id: "t1",
    initialPosition: { x: 0, y: 0 },
    initialSize: { width: 400, height: 300 },
    center: [103.99022278769138, 1.3611983664874288],
    pitch: 54.499999999999964,
    bearing: 24.799999999999727,
    zoom: 16.176774576698488,
    headerText: "T1 THA-1:46 THA-2:8 THA-3:2 SC:4",
    geoJsonFile: "t1-points.geojson"
  },
  {
    id: "t2",
    initialPosition: { x: 420, y: 0 },
    initialSize: { width: 400, height: 300 },
    pitch: 39.29281560662686,
    bearing: -67.22082244313833,
    center: [103.9893285842914, 1.3547199452920466],
    zoom: 15.36181532969349,
    headerText: "T2 THA-1:32 THA-2:5 THA-3:1 SC:3",
    geoJsonFile: "t2-points.geojson"
  },
  {
    id: "t3",
    initialPosition: { x: 0, y: 360 },
    initialSize: { width: 400, height: 300 },
    pitch: 5.266396097420951,
    bearing: 113.58340467833523,
    center: [103.98656378487374, 1.3563705376616753],
    zoom: 15.612390206932018,
    headerText: "T3 THA-1:65 THA-2:5 SC:7",
    geoJsonFile: "t3-points.geojson"
  },
  {
    id: "t4",
    initialPosition: { x: 420, y: 360 },
    initialSize: { width: 400, height: 300 },
    pitch: 52.79281560662688,
    bearing: 113.57917755686185,
    center: [103.98211515565146, 1.3393699990872392],
    zoom: 15.145783265915266,
    headerText: "T4 THA-1:10 THA-2:6 SC:1",
    geoJsonFile: "t4-points.geojson"
  },
];

export default function Taxi() {
  const NAV_INDEX = 1;
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Taxi Maps', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/taxi'},
  ];

  const [mapConfigs, setMapConfigs] = useState<MapConfig[]>(() => 
    initialMapConfigs.map((config, index) => ({
      ...config,
      zIndex: index + 1
    }))
  );

  const handleFocus = (id: string) => {
    setMapConfigs(prevConfigs => {
      const maxZIndex = Math.max(...prevConfigs.map(config => config.zIndex));
      return prevConfigs.map(config => 
        config.id === id ? { ...config, zIndex: maxZIndex + 1 } : config
      );
    });
  };

  return (
    <PageContainer scrollable={true}>
      <Toaster />
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Taxi Supply Situation & Around Changi Airport ℹ️
          </h2>
        </div>

        <Separator className="my-2" />

        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        
        <div>
          ⓘ <em>Drag and Resize Maps</em>
        </div>

        <div className="relative w-full h-[80vh]">
          {mapConfigs.map((config) => (
            <DraggableMap
              key={config.id}
              id={config.id}
              initialPosition={config.initialPosition}
              initialSize={config.initialSize}
              center={config.center}
              pitch={config.pitch}
              bearing={config.bearing}
              zoom={config.zoom}
              headerText={config.headerText}
              zIndex={config.zIndex}
              onFocus={() => handleFocus(config.id)}
              geoJsonFile={config.geoJsonFile || ""}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}