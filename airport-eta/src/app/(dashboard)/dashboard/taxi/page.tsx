// app/dashboard/taxi/page.tsx
"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import DraggableMap from "@/components/Dashboard/maps/DraggableMap"
import { dashboardConfig } from "@/config/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

interface MapConfig {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  center: [number, number];
  pitch?: number;
  bearing?: number;
  zoom: number;
  headerText: string;
  zIndex?: number;
  geoJsonFile: string;  // New property for GeoJSON file name
}

const initialMapConfigs: MapConfig[] = [
  {
    id: "t1",
    initialPosition: { x:0, y: 0 },
    initialSize: { width: 820, height: 750 },
    center: [103.99022278769138, 1.3611983664874288],
    pitch: 54.499999999999964,
    bearing: 24.799999999999727,
    zoom: 16.176774576698488,
    headerText: "T1 THA-1:46 THA-2:8 THA-3:2 SC:4",
    geoJsonFile: "t1-points.geojson",
    zIndex: 1,
  },
  {
    id: "t2",
    initialPosition: { x:0, y: 0 },
    initialSize: { width: 820, height: 750 },
    pitch: 39.29281560662686,
    bearing: -67.22082244313833,
    center: [103.9893285842914, 1.3547199452920466],
    zoom: 15.36181532969349,
    headerText: "T2 THA-1:32 THA-2:5 THA-3:1 SC:3",
    geoJsonFile: "t2-points.geojson",
    zIndex: 1,
  },
  {
    id: "t3",
    initialPosition: { x:0, y: 0 },
    initialSize: { width: 820, height: 750 },
    pitch: 5.266396097420951,
    bearing: 113.58340467833523,
    center: [103.98656378487374, 1.3563705376616753],
    zoom: 15.612390206932018,
    headerText: "T3 THA-1:65 THA-2:5 SC:7",
    geoJsonFile: "t3-points.geojson",
    zIndex: 1,
  },
  {
    id: "t4",
    initialPosition: { x:0, y: 0 },
    initialSize: { width: 820, height: 750 },
    pitch: 52.79281560662688,
    bearing: 113.57917755686185,
    center: [103.98211515565146, 1.3393699990872392],
    zoom: 15.145783265915266,
    headerText: "T4 THA-1:10 THA-2:6 SC:1",
    geoJsonFile: "t4-points.geojson",
    zIndex: 1,
  },
];

export default function Taxi() {
  const NAV_INDEX = 1;
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Taxi Maps', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/taxi'},
  ];

  const [activeMapId, setActiveMapId] = useState<string | null>(null);

  const handleMapClick = (id: string) => {
    setActiveMapId(id);
  };

  const handleFocus = () => {
    // This function is no longer needed, but kept for compatibility with DraggableMap
  };

  return (
    <PageContainer scrollable={false}>
      <Toaster />
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Taxi Supply Situation & Around Changi Airport ℹ️
          </h2>
          <div className="hidden md:block">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <Separator className="mb-4" />

        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar */}
          <Card className="w-80 mr-4 shadow-md h-fit">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Icons.taxi className="mr-2" /> Terminal Selection
              </CardTitle>
              <Separator className="mb-2" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
                {initialMapConfigs.map((config) => (
                  <Button
                    key={config.id}
                    variant={activeMapId === config.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-left mb-1 pl-4"
                    onClick={() => handleMapClick(config.id)}
                  >
                    <Icons.mapPin className="mr-2 h-4 w-4" />
                    {config.headerText}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map container */}
          <Card className="flex-grow relative shadow-md">
            <CardContent className="p-0 h-full">
              {activeMapId ? (
                <DraggableMap
                  {...initialMapConfigs.find(config => config.id === activeMapId)!}
                  onFocus={handleFocus}
                  zIndex={1}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a terminal to view its map
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}