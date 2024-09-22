// components/Dashboard/overview/FlightInformation.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';
import { Badge } from "@/components/ui/badge";

const terminals = [
  { id: 1, stands: ['A', 'B', 'C', 'D'] },
  { id: 2, stands: ['North', 'South'] },
  { id: 3, stands: ['North', 'South'] },
  { id: 4, stands: ['North', 'South'] },
];

export function FlightInformation() {
  return (
    <Disable settingKey="flight-information">
      <Card>
        <CardHeader>
          <CardTitle>Flight Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Terminal</TableHead>
                <TableHead>Taxi Stands</TableHead>
                <TableHead>Landed (last 20 min)</TableHead>
                <TableHead>Landing (next 20 min)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminals.map((terminal) => {
                const landedPax = Math.floor(Math.random() * 200) + 50;
                const landingFlights = Math.floor(Math.random() * 5) + 1;
                const landingPax = Math.floor(Math.random() * 300) + 100;
                
                return (
                  <TableRow key={terminal.id}>
                    <TableCell className="font-medium">Terminal {terminal.id}</TableCell>
                    <TableCell>
                      {terminal.stands.map((stand) => (
                        <Badge key={stand} variant="outline" className="mr-1">
                          {stand}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{landedPax}</span> pax
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{landingFlights}</span> flights,{' '}
                      <span className="font-semibold">{landingPax}</span> pax
                    </TableCell>
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