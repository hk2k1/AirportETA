// app/dashboard/reports/page.tsx
"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker"
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const reportTypes = [
  "Mobile App Utilization Report",
  "App Driver Engagement Report",
  "Points Report by Month",
  "App Points Conversion Report",
  "Most Active Drivers Report",
];

const dummyLogs = [
  { id: 1, triggeredTime: '2023-09-20 10:30', title: 'Mobile App Usage Spike', status: 'Acknowledged', acknowledgeTime: '2023-09-20 10:35', acknowledgedBy: 'John Doe' },
  { id: 2, triggeredTime: '2023-09-20 11:45', title: 'New Driver Registration', status: 'Pending', acknowledgeTime: '-', acknowledgedBy: '-' },
  // Add more dummy data as needed
];

const dummyChartData = [
  { name: 'Mobile App', value: 400 },
  { name: 'Web App', value: 300 },
  { name: 'API Calls', value: 300 },
  { name: 'Other', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ReportsPage() {
    const NAV_INDEX = 5; // Adjust based on the position of Reports in your sidebar nav
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'Reports', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/reports'},
    ];

    const [selectedReport, setSelectedReport] = useState('');
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({ from: new Date(), to: new Date() });

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Reports 📊
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                    <Select onValueChange={setSelectedReport}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                            {reportTypes.map((type) => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DatePickerWithRange setDateRange={setDateRange} />
                    <Button className="w-[100px]" variant="secondary">Search</Button>
                    <Button className="w-[100px]" variant="outline">Export</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Log ID</TableHead>
                                        <TableHead>Triggered Time</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Acknowledge Time</TableHead>
                                        <TableHead>Acknowledged By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dummyLogs.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell>{log.id}</TableCell>
                                            <TableCell>{log.triggeredTime}</TableCell>
                                            <TableCell>{log.title}</TableCell>
                                            <TableCell>{log.status}</TableCell>
                                            <TableCell>{log.acknowledgeTime}</TableCell>
                                            <TableCell>{log.acknowledgedBy}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Usage Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={dummyChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {dummyChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={[
                                        { name: 'Jan', value: 400 },
                                        { name: 'Feb', value: 300 },
                                        { name: 'Mar', value: 200 },
                                        { name: 'Apr', value: 278 },
                                        { name: 'May', value: 189 },
                                    ]}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}