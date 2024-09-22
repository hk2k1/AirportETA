// app/dashboard/actions/page.tsx
"use client"
import React from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdjustTaxiSupply } from "@/components/Dashboard/actions/adjust-taxi-supply";
import { UrgentCall } from '@/components/Dashboard/actions/urgent-call';

export default function ActionsPage() {
    const NAV_INDEX = 3; // Adjust based on the position of Actions in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Actions', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/actions'},
    ];

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Actions 🚕
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <Tabs defaultValue="adjust-taxi-supply">
                    <TabsList>
                        <TabsTrigger value="adjust-taxi-supply">Adjust Taxi Supply</TabsTrigger>
                        <TabsTrigger value="urgent-call">Urgent Call</TabsTrigger>
                    </TabsList>
                    <TabsContent value="adjust-taxi-supply">
                        <AdjustTaxiSupply />
                    </TabsContent>
                    <TabsContent value="urgent-call">
                        <UrgentCall />
                    </TabsContent>
                </Tabs>
            </div>
        </PageContainer>
    );
}