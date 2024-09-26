import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';

const terminalData = [
  { id: 1, stands: [
    { name: 'A', waitTime: 3 },
    { name: 'B', waitTime: 7 }
  ]},
  { id: 2, stands: [
    { name: 'North', waitTime: 5 },
    { name: 'South', waitTime: 2 }
  ]},
  { id: 3, stands: [
    { name: 'North', waitTime: 8 },
    { name: 'South', waitTime: 4 }
  ]},
  { id: 4, stands: [
    { name: 'North', waitTime: 6 }
  ]},
];

const getWaitTimeColor = (time: number) => {
  if (time > 8) return 'bg-red-500';
  if (time > 5) return 'bg-orange-500';
  return 'bg-green-500';
};

export function EstPaxWaitTime() {
  return (
    <Disable settingKey="est-pax-wait-time">
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-sm font-medium">Est. Pax Wait Time</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-1 px-2 text-xs">Term</TableHead>
                <TableHead className="py-1 px-2 text-xs">Stand</TableHead>
                <TableHead className="py-1 px-2 text-xs">Wait</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminalData.map((terminal) => (
                terminal.stands.map((stand, index) => (
                  <Disable key={`${terminal.id}-${stand.name}`} settingKey={`taxi-stand-t${terminal.id}-${stand.name}`}>
                    <TableRow>
                      {index === 0 && (
                        <TableCell className="py-1 px-2 text-xs font-medium">T{terminal.id}</TableCell>
                      )}
                      {index !== 0 && <TableCell />}
                      <TableCell className="py-1 px-2 text-xs">{stand.name}</TableCell>
                      <TableCell className="py-1 px-2 text-xs">
                        <div className={`inline-block px-1 rounded ${getWaitTimeColor(stand.waitTime)} text-white text-xs`}>
                          {stand.waitTime}m
                        </div>
                      </TableCell>
                    </TableRow>
                  </Disable>
                ))
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Disable>
  );
}