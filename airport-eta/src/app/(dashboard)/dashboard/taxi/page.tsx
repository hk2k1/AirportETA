"use client"
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
import React from "react";
import DraggableMap from "@/components/Dashboard/maps/DraggableMap"
import { dashboardConfig } from "@/config/dashboard";


export default function Taxi() {
//   const user = await auth();
//   const { flightLogs, totalCount } = await getFlightLogs();
// const [position, setPosition] = useState({ x: 0, y: 0 });
// const [size, setSize] = useState({ width: 200, height: 200 });
  const TAXI_NAV_INDEX = 1;
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: dashboardConfig.sidebarNav[TAXI_NAV_INDEX].title || 'Taxi Maps', link: dashboardConfig.sidebarNav[TAXI_NAV_INDEX].href || '/dashboard/taxi'},
  ];

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

        <DraggableMap />

      </div>
    </PageContainer>
  );
}
