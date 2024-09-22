// components/Dashboard/overview/EstTaxiWaitTime.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';

const terminals = [1, 2, 3, 4];

const getWaitTimeColor = (time: number) => {
  if (time > 15) return 'bg-red-500';
  if (time > 10) return 'bg-orange-500';
  return 'bg-green-500';
};

const getWaitTimeLabel = (time: number) => {
  if (time > 15) return 'High';
  if (time > 10) return 'Medium';
  return 'Low';
};

export function EstTaxiWaitTime() {
  return (
    <Disable settingKey="est-taxi-wait-time">
      <Card>
        <CardHeader>
          <CardTitle>Est. Taxi Wait Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Terminal</TableHead>
                <TableHead>Wait Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminals.map((terminal) => {
                const waitTime = Math.floor(Math.random() * 20) + 1;
                const colorClass = getWaitTimeColor(waitTime);
                const label = getWaitTimeLabel(waitTime);
                return (
                  <TableRow key={terminal}>
                    <TableCell className="font-medium">Terminal {terminal}</TableCell>
                    <TableCell>
                      <div className={`inline-block px-2 py-1 rounded ${colorClass} text-white font-semibold`}>
                        {waitTime} min
                      </div>
                    </TableCell>
                    <TableCell>{label}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Disable>
  );
}