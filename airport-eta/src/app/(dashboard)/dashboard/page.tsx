// app/dashboard/overview/page.tsx
"use client"
import React from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { dashboardConfig } from "@/config/dashboard";
import { EstPaxWaitTime } from "@/components/Dashboard/overview/EstPaxWaitTime";
import { EstTaxiWaitTime } from "@/components/Dashboard/overview/EstTaxiWaitTime";
import { FlightInformation } from "@/components/Dashboard/overview/FlightInformation";
import { AlertBulletins } from "@/components/Dashboard/overview/AlertBulletins";
import { EstTaxiQueueSupply } from "@/components/Dashboard/overview/EstTaxiQueueSupply";

export default function OverviewPage() {
    const NAV_INDEX = 0; // Adjust based on the position of Overview in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Overview', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/overview'},
    ];

    return (
        <PageContainer scrollable={true}>
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        TMS Operator Dashboard Overview 🖥️
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    <EstPaxWaitTime />
                    <EstTaxiWaitTime />
                    <FlightInformation />
                    <AlertBulletins />
                </div>

                <EstTaxiQueueSupply />
            </div>
        </PageContainer>
    );
}