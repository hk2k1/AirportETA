// app/dashboard/overview/page.tsx
"use client"
import React from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disable } from '@/components/Dashboard/Disable';

export default function OverviewPage() {
    const NAV_INDEX = 0; // Adjust based on the position of Overview in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Overview', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/overview'},
    ];

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        TMS Operator Dashboard Overview 📊
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Disable settingKey="taxi-stand-a">
                        <Card>
                            <CardHeader>
                                <CardTitle>Taxi Stand A</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Information about Taxi Stand A</p>
                            </CardContent>
                        </Card>
                    </Disable>

                    <Disable settingKey="taxi-stand-b">
                        <Card>
                            <CardHeader>
                                <CardTitle>Taxi Stand B</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Information about Taxi Stand B</p>
                            </CardContent>
                        </Card>
                    </Disable>

                    <Disable settingKey="est-pax-wait-time">
                        <Card>
                            <CardHeader>
                                <CardTitle>Est. Pax Wait Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Estimated passenger wait time information</p>
                            </CardContent>
                        </Card>
                    </Disable>
                </div>
            </div>
        </PageContainer>
    );
}