"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
// import { DataTable } from "@/components/tables/flight-tables/data-table";
// import { Suspense } from "react";
// import { getFlightLogs } from "@/lib/actions/flightlog.action";
// import { columns } from "@/components/tables/flight-tables/columns";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
// import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { CreateFlightLogDialog } from "@/components/forms/CreateFlightLogDialog";
import { Toaster } from "sonner";
import DraggableMap from "@/components/Dashboard/maps/DraggableMap"
import { dashboardConfig } from "@/config/dashboard";

interface MapConfig {
  id: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  center: [number, number];
  zoom: number;
  headerText: string;
  zIndex: number;
}

const initialMapConfigs: Omit<MapConfig, 'zIndex'>[] = [
  {
    id: "t1",
    initialPosition: { x: 0, y: 0 },
    initialSize: { width: 400, height: 300 },
    center: [103.91289, 1.413576],
    zoom: 17,
    headerText: "T1 THA-1:46 THA-2:8 THA-3:2 SC:4"
  },
  {
    id: "t2",
    initialPosition: { x: 420, y: 0 },
    initialSize: { width: 400, height: 300 },
    center: [103.91789, 1.415576],
    zoom: 17,
    headerText: "T2 THA-1:32 THA-2:5 THA-3:1 SC:3"
  },
  // Add more configurations as needed
];

export default function Taxi() {
//   const user = await auth();
//   const { flightLogs, totalCount } = await getFlightLogs();
// const [position, setPosition] = useState({ x: 0, y: 0 });
// const [size, setSize] = useState({ width: 200, height: 200 });
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
            {/* Welcome, {user?.user?.name ?? "Pilot"}! 👋 */}
            Taxi Supply Situation & Around Changi Airport ℹ️
          </h2>
          {/* <CreateFlightLogDialog /> */}
        </div>

        <Separator className="my-2" />

        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        
        <div>
          Todo: Add points to maps, Change Style of Maps
        </div>

        <div className="relative w-full h-[80vh]">
          {mapConfigs.map((config) => (
            <DraggableMap
              key={config.id}
              id={config.id}
              initialPosition={config.initialPosition}
              initialSize={config.initialSize}
              center={config.center}
              zoom={config.zoom}
              headerText={config.headerText}
              zIndex={config.zIndex}
              onFocus={() => handleFocus(config.id)}
            />
          ))}
        </div>

      </div>
    </PageContainer>
  );
}
