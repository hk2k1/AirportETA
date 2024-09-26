// components/Dashboard/overview/AlertBulletins.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disable } from '@/components/Dashboard/Disable';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/icons";


const mockAlerts = [
  { id: 1, type: 'warning', title: 'High Traffic', message: "High traffic at Terminal 1", timestamp: "2023-09-23 14:30" },
  { id: 2, type: 'info', title: 'System Maintenance', message: "System maintenance scheduled for tonight", timestamp: "2023-09-23 10:15" },
  { id: 3, type: 'error', title: 'Weather Alert', message: "Weather alert: Heavy rain expected", timestamp: "2023-09-23 09:45" },
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <Icons.triangleAlertIcon className="h-4 w-4" />;
    case 'error':
      return <Icons.circleAlertIcon className="h-4 w-4" />;
    default:
      return <Icons.infoIcon className="h-4 w-4" />;
  }
};

const getAlertVariant = (type: string) => {
  switch (type) {
    case 'warning':
      return 'default';
    case 'error':
      return 'destructive';
    default:
      return 'default';
  }
};

export function AlertBulletins() {
  return (
    <Disable settingKey="alert-bulletin">
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-sm font-medium">Alert Bulletins</CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-1">
          {mockAlerts.map((alert) => (
            <Alert key={alert.id} variant={getAlertVariant(alert.type)} className="py-1 px-2">
              {getAlertIcon(alert.type)}
              <AlertTitle className="ml-2 text-xs">{alert.title}</AlertTitle>
              <AlertDescription className="ml-4 text-xs">
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </Disable>
  );
}