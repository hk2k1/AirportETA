import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Disable } from '@/components/Dashboard/Disable';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

const terminalData = [
  { 
    id: 1, 
    stands: [
      { name: 'A', taxis: 26 },
      { name: 'B', taxis: 30 }
    ],
    taxisNeeded: 8
  },
  { 
    id: 2, 
    stands: [
      { name: 'North', taxis: 20 },
      { name: 'South', taxis: 15 }
    ],
    taxisNeeded: 12
  },
  { 
    id: 3, 
    stands: [
      { name: 'North', taxis: 35 },
      { name: 'South', taxis: 28 }
    ],
    taxisNeeded: 5
  },
  { 
    id: 4, 
    stands: [
      { name: 'North', taxis: 40 }
    ],
    taxisNeeded: 10
  },
];

const mockChartData = [
  { name: '00:00', value: 4000 },
  { name: '04:00', value: 3000 },
  { name: '08:00', value: 2000 },
  { name: '12:00', value: 2780 },
  { name: '16:00', value: 1890 },
  { name: '20:00', value: 2390 },
];

const chartConfig = {
  value: {
    label: "Taxis",
    color: "hsl(var(--chart-1))",
  },
};

export function EstTaxiQueueSupply() {
  return (
    <Disable settingKey="est-taxi-queue">
      <Card className="h-max">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-lg font-medium">Est. Taxi Queue & Supply</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-2 gap-2">
            {terminalData.map((terminal) => (
              <Card key={terminal.id} className="p-3">
                <div className="flex flex-col h-full">
                  <CardTitle className="text-md font-medium mb-2">Terminal {terminal.id}</CardTitle>
                  <div className="flex justify-between flex-grow">
                    <div className="space-y-2 flex-grow">
                      <div className="grid grid-cols-2 gap-2">
                        {terminal.stands.map((stand) => (
                          <Disable key={stand.name} settingKey={`taxi-stand-t${terminal.id}-${stand.name}`}>
                            <Badge variant="outline" className="text-sm p-1">
                              Stand {stand.name}: {stand.taxis}
                            </Badge>
                          </Disable>
                        ))}
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <Icons.taxi className="w-4 h-4 mr-2" />
                        <span>{terminal.taxisNeeded} taxis needed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-grow space-x-8">
                    <div className="w-40 h-24 ml-4">
                      <ChartContainer config={chartConfig}>
                        <AreaChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{fontSize: 10}} />
                          <YAxis tick={{fontSize: 10}} />
                          <Tooltip />
                          <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                    <div className="w-40 h-24 ml-4">
                      <ChartContainer config={chartConfig}>
                        <BarChart data={mockChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{fontSize: 10}} />
                          <YAxis tick={{fontSize: 10}} />
                          <Tooltip />
                          <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </Disable>
  );
}