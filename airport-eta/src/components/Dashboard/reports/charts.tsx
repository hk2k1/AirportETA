"use client"
import React from 'react';
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { dummyLogs } from './search-table';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from 'recharts';

export function Charts() {
  // Process log data for status distribution
  // const statusDistribution = dummyLogs.reduce((acc, log) => {
  //   acc[log.status] = (acc[log.status] || 0) + 1;
  //   return acc;
  // }, {} as Record<string, number>);

  // const pieChartData = Object.entries(statusDistribution).map(([status, count]) => ({ status, count }));

  const pieChartData = [
    { status: 'Acknowledged', count: 3, fill: 'hsl(var(--chart-1))' },
    { status: 'Pending', count: 2, fill: 'hsl(var(--chart-2))' },
    { status: 'Investigating', count: 1, fill: 'hsl(var(--chart-3))' },
    { status: 'Resolved', count: 2, fill: 'hsl(var(--chart-4))' },
  ]

  // Process log data for daily log count
  const dailyLogCount = dummyLogs.reduce((acc, log) => {
    const date = log.triggeredTime.split(' ')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(dailyLogCount)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // const pieChartConfig: ChartConfig = {
  //   count: {
  //     label: "Count",
  //   },
  //   ...Object.fromEntries(pieChartData.map(({ status }, index) => [
  //     status,
  //     {
  //       label: status,
  //       // color: `hsl(var(--chart-${index}))`,
  //       color: "hsl(var(--chart-1))",
  //     }
  //   ]))
  // };

  const pieChartConfig: ChartConfig = {
    count:{
      label: "Count",
    },
    Acknowledged: {
      label: "Acknowledged",
      color: "hsl(var(--chart-1))",
    },
    Pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
    Investigating: {
      label: "Investigating",
      color: "hsl(var(--chart-3))",
    },
    Resolved: {
      label: "Resolved",
      color: "hsl(var(--chart-4))",
    },
  };


  const barChartConfig: ChartConfig = {
    count: {
      label: "Log Count",
      color: "hsl(var(--chart-1))",
    },
  };

  // const totalLogs = React.useMemo(() => {
  //   return pieChartData.reduce((acc, curr) => acc + curr.count, 0)
  // }, [pieChartData]);

  const totalLogs = 8;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pie Chart for Status Distribution */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Log Status Distribution</CardTitle>
          <CardDescription>Overview of log statuses</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieChartData}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalLogs.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Logs
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bar Chart for Daily Log Count */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Log Count</CardTitle>
          <CardDescription>Number of logs per day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart accessibilityLayer data={barChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(5)} // Display only MM-DD
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing daily log counts for the selected period
          </div>
        </CardFooter>
      </Card> 
    </div>
  );
}