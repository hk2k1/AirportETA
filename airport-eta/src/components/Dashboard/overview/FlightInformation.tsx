// components/Dashboard/overview/FlightInformation.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';

const terminalData = [
  { id: 1, landedPax: 150, landingFlights: 3, landingPax: 280 },
  { id: 2, landedPax: 200, landingFlights: 2, landingPax: 180 },
  { id: 3, landedPax: 100, landingFlights: 4, landingPax: 320 },
  { id: 4, landedPax: 75, landingFlights: 1, landingPax: 90 },
];

export function FlightInformation() {
  return (
    <Disable settingKey="flight-information">
      <Card className="h-full">
        <CardHeader className="p-2">
          <CardTitle className="text-sm font-medium">Flight Information</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="py-1 px-2 text-xs">Term</TableHead>
                <TableHead className="py-1 px-2 text-xs">Landed</TableHead>
                <TableHead className="py-1 px-2 text-xs">Landing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminalData.map((terminal) => (
                <TableRow key={terminal.id}>
                  <TableCell className="py-1 px-2 text-xs font-medium">T{terminal.id}</TableCell>
                  <TableCell className="py-1 px-2 text-xs">{terminal.landedPax}p</TableCell>
                  <TableCell className="py-1 px-2 text-xs">{terminal.landingFlights}f, {terminal.landingPax}p</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Disable>
  );
}