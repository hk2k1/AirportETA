// components/Dashboard/overview/EstPaxWaitTime.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disable } from '@/components/Dashboard/Disable';

const terminals = [
  { id: 1, stands: ['A', 'B', 'C', 'D'] },
  { id: 2, stands: ['North', 'South'] },
  { id: 3, stands: ['North', 'South'] },
  { id: 4, stands: ['North', 'South'] },
];

const getWaitTimeColor = (time: number) => {
  if (time > 8) return 'bg-red-500';
  if (time > 5) return 'bg-orange-500';
  return 'bg-green-500';
};

export function EstPaxWaitTime() {
  return (
    <Disable settingKey="est-pax-wait-time">
      <Card>
        <CardHeader>
          <CardTitle>Est. Pax Wait Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Terminal</TableHead>
                <TableHead>Taxi Stand</TableHead>
                <TableHead>Wait Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terminals.map((terminal) => (
                <React.Fragment key={terminal.id}>
                  {terminal.stands.map((stand, index) => (
                    <Disable key={`${terminal.id}-${stand}`} settingKey={`taxi-stand-t${terminal.id}-${stand}`}>
                      <TableRow>
                        {index === 0 && (
                          <TableCell rowSpan={terminal.stands.length} className="font-medium">
                            Terminal {terminal.id}
                          </TableCell>
                        )}
                        <TableCell>{stand}</TableCell>
                        <TableCell>
                          {(() => {
                            const waitTime = Math.floor(Math.random() * 10) + 1;
                            const colorClass = getWaitTimeColor(waitTime);
                            return (
                              <div className={`inline-block px-2 py-1 rounded ${colorClass} text-white font-semibold`}>
                                {waitTime} min
                              </div>
                            );
                          })()}
                        </TableCell>
                      </TableRow>
                    </Disable>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Disable>
  );
}