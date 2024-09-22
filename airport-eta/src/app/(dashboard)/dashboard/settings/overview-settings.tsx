import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function OverviewSettings() {
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Overview Page Components</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="est-pax-wait-time">Est. Pax Wait Time</Label>
                        <Switch id="est-pax-wait-time" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="est-taxi-wait-time">Est. Taxi Wait Time</Label>
                        <Switch id="est-taxi-wait-time" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="flight-information">Flight Information</Label>
                        <Switch id="flight-information" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="alerts-bulletin">Alerts Bulletin</Label>
                        <Switch id="alerts-bulletin" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="est-taxi-queue">Est. Taxi Queue & Taxi Supply</Label>
                        <Switch id="est-taxi-queue" defaultChecked />
                    </div>
                </div>
            </CardContent>
        </Card>
    </>
  )
}
