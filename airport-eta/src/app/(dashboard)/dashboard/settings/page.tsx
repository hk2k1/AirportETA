// app/dashboard/settings/page.tsx
"use client"
import React from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { Thresholds } from "@/components/Dashboard/settings/Thresholds";
import { TaxiSupply } from "@/components/Dashboard/settings/TaxiSupply";
import { ShortCutBlacklisting } from "@/components/Dashboard/settings/Blacklisting";
import OverviewSettings  from  "./overview-settings";


export default function DashboardSettings() {
    const NAV_INDEX = 2;
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Dashboard Settings', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/settings'},
    ];

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        TMS Operator Dashboard Settings ⚙️
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Thresholds />
                    <ShortCutBlacklisting />
                    <OverviewSettings />
                    <TaxiSupply />
                </div>
            </div>
        </PageContainer>
    );
}