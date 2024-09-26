// components/Dashboard/settings/OverviewSettings.tsx
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from '@/lib/contexts/SettingsContext';
import { SettingSwitch } from '@/components/Dashboard/settings/SettingSwitch';

export default function OverviewSettings() {
    const { loading } = useSettings();

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Overview Page Components</CardTitle>
                    <Separator />
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <Skeleton className="h-4 w-[150px]" />
                                <Skeleton className="h-6 w-10" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview Page Components</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <SettingSwitch settingKey="EstPaxWaitTime" label="Est. Pax Wait Time" />
                    <SettingSwitch settingKey="EstTaxiWaitTime" label="Est. Taxi Wait Time" />
                    <SettingSwitch settingKey="FlightInformation" label="Flight Information" />
                    <SettingSwitch settingKey="AlertBulletins" label="Alerts Bulletin" />
                    <SettingSwitch settingKey="est-taxi-queue" label="Est. Taxi Queue & Taxi Supply" />
                </div>
            </CardContent>
        </Card>
    )
}