// app/dashboard/reports/page.tsx
"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { SearchAndTable } from "@/components/Dashboard/reports/search-table";
import { Charts } from "@/components/Dashboard/reports/charts";
import { DateRange } from "react-day-picker";

export default function ReportsPage() {
    const NAV_INDEX = 5; // Adjust based on the position of Reports in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Reports', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/reports'},
    ];

    const handleSearch = (reportType: string, dateRange: DateRange | undefined) => {
        // Here you would typically fetch new data based on the search criteria
        console.log("Searching for:", reportType, dateRange);
        // Update the logs and charts based on the search criteria
    };

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Reports 📊
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <SearchAndTable onSearch={handleSearch} />

                <Charts />
            </div>
        </PageContainer>
    );
}