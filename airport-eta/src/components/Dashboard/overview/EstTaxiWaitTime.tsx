import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';

const terminalData = [
  { id: 1, waitTime: 8 },
  { id: 2, waitTime: 12 },
  { id: 3, waitTime: 18 },
  { id: 4, waitTime: 5 },
];

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
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-sm font-medium">Est. Taxi Wait Time</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-1 px-2 text-xs">Term</TableHead>
                <TableHead className="py-1 px-2 text-xs">Wait</TableHead>
                <TableHead className="py-1 px-2 text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminalData.map((terminal) => {
                const colorClass = getWaitTimeColor(terminal.waitTime);
                const label = getWaitTimeLabel(terminal.waitTime);
                return (
                  <TableRow key={terminal.id}>
                    <TableCell className="py-1 px-2 text-xs font-medium">T{terminal.id}</TableCell>
                    <TableCell className="py-1 px-2 text-xs">
                      <div className={`inline-block px-1 rounded ${colorClass} text-white text-xs`}>
                        {terminal.waitTime}m
                      </div>
                    </TableCell>
                    <TableCell className="py-1 px-2 text-xs">{label}</TableCell>
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