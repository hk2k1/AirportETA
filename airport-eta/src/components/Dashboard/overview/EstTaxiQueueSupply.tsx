// components/Dashboard/overview/EstTaxiQueueSupply.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Disable } from '@/components/Dashboard/Disable';
import { AreaChart, Area, BarChart, Bar, XAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";

const terminals = [
  { id: 1, stands: ['A', 'B', 'C', 'D'] },
  { id: 2, stands: ['North', 'South'] },
  { id: 3, stands: ['North', 'South'] },
  { id: 4, stands: ['North', 'South'] },
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terminals.map((terminal) => (
          <Card key={terminal.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>Terminal {terminal.id} Taxi Queue & Supply</CardTitle>
              <CardDescription>Estimated wait times and taxi demand</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 gap-4 mb-4">
                {terminal.stands.map((stand) => (
                  <Disable key={stand} settingKey={`taxi-stand-t${terminal.id}-${stand}`}>
                    <Card>
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Stand {stand}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</div>
                        <div className="text-sm text-muted-foreground">pax waiting</div>
                      </CardContent>
                    </Card>
                  </Disable>
                ))}
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icons.taxi className="mr-2" />
                  <span className="text-lg font-semibold">
                    {Math.floor(Math.random() * 20) + 5} taxis needed
                  </span>
                </div>
                <Badge variant="secondary">High Demand</Badge>
              </div>
              <div className="space-y-4">
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <AreaChart data={mockChartData}>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 2)}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <ChartTooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
                <ChartContainer config={chartConfig} className="h-[200px]">
                  <BarChart data={mockChartData}>
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 2)}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <ChartTooltip />
                    <Bar dataKey="value" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Disable>
  );
}