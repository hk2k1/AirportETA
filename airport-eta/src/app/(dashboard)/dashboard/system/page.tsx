// app/dashboard/system/page.tsx
"use client"
import React, { useState } from 'react';
import PageContainer from "@/components/Dashboard/page-container";
import { Breadcrumbs } from "@/components/Dashboard/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { dashboardConfig } from "@/config/dashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil } from "lucide-react";

interface SystemParameter {
  id: number;
  name: string;
  value: string;
  description: string;
  category: string;
}

const initialSystemParameters: SystemParameter[] = [
  {
    id: 1,
    name: "Advanced Analytics Refresh Data Threshold",
    value: "5",
    description: "The threshold in minutes for Monitoring Service to check against most recent Advanced Analytics data to determine if Advanced Analytics system is down. Default value is 5 minutes.",
    category: "System",
  },
  {
    id: 2,
    name: "AOCS Refresh Data Threshold",
    value: "120",
    description: "The threshold in minutes for Monitoring Service to check against most recent AOCS data to determine if AOCS system is down. Default value is 120 minutes.",
    category: "System",
  },
  {
    id: 3,
    name: "Entry Throughput Interval",
    value: "10",
    description: "The entry throughput interval to check if entry camera is offline within this interval period. If yes, use 60%-90% ratio to split the external taxi count between T1 and T3; if not, use this entry throughput within this interval period to split the external taxi count between T1 and T3. Default value is 10 minutes.",
    category: "System",
  },
  {
    id: 4,
    name: "LTA Datafeeds Refresh Data Threshold",
    value: "5",
    description: "The threshold in minutes for Monitoring Service to check against most recent LTA Datafeeds data to determine if LTA Datafeeds system is down. Default value is 5 minutes.",
    category: "System",
  },
  {
    id: 5,
    name: "Next Y Minutes For Flight Count",
    value: "30",
    description: "The duration in minutes from current time to look for future flight data. Default value is 30 minutes.",
    category: "System",
  },
  {
    id: 6,
    name: "Past X Minutes For Flight Count",
    value: "30",
    description: "The duration in minutes from current time to look for past flight data. Default value is 30 minutes.",
    category: "System",
  },
  {
    id: 7,
    name: "TQGSS Refresh Data Threshold",
    value: "10",
    description: "The threshold in minutes for Monitoring Service to check against most recent TQGSS data to determine if TQGSS system is down. Default value is 5 minutes.",
    category: "System",
  },
];

export default function SystemParametersPage() {
    const NAV_INDEX = 6;
    const breadcrumbItems = [
        { title: "Dashboard", link: "/dashboard" },
        { title: dashboardConfig.sidebarNav[NAV_INDEX].title || 'System Parameters', link: dashboardConfig.sidebarNav[NAV_INDEX].href || '/dashboard/system'},
    ];

    const [parameters, setParameters] = useState<SystemParameter[]>(initialSystemParameters);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleEdit = (id: number) => {
        setEditingId(id);
    };

    const handleSave = (id: number, newValue: string) => {
        setParameters(parameters.map(param => 
            param.id === id ? { ...param, value: newValue } : param
        ));
        setEditingId(null);
    };

    const handleCreate = () => {
        // Implement create functionality
        console.log("Create new parameter");
    };

    const handleDelete = (id: number) => {
        setParameters(parameters.filter(param => param.id !== id));
    };

    return (
        <PageContainer scrollable={true}>
            <Toaster />
            <div className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                        System Parameters ⚙️
                    </h2>
                </div>

                <Separator className="my-6" />

                <div className="hidden md:block">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">System Parameter Name</TableHead>
                                <TableHead>Value</TableHead>
                                <TableHead className="w-[500px]">Description</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {parameters.map((param) => (
                                <TableRow key={param.id}>
                                    {/* <TableCell>{param.name}</TableCell> */}
                                    <TableCell>
                                        {editingId === param.id ? (
                                            <Input 
                                                type="text" 
                                                defaultValue={param.name} 
                                                onBlur={(e) => handleSave(param.id, e.target.name)}
                                                className="w-60"
                                            />
                                        ) : (
                                            param.name
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === param.id ? (
                                            <Input 
                                                type="text" 
                                                defaultValue={param.value} 
                                                onBlur={(e) => handleSave(param.id, e.target.value)}
                                                className="w-20"
                                            />
                                        ) : (
                                            param.value
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === param.id ? (
                                            <Input 
                                                type="text" 
                                                defaultValue={param.description} 
                                                onBlur={(e) => handleSave(param.id, e.target.description)}
                                                className="w-60"
                                            />
                                        ) : (
                                            param.description
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editingId === param.id ? (
                                            <Input 
                                                type="text" 
                                                defaultValue={param.category} 
                                                onBlur={(e) => handleSave(param.id, e.target.category)}
                                                className="w-20"
                                            />
                                        ) : (
                                            param.category
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleEdit(param.id)}
                                            variant="outline"
                                            size="sm"
                                            className="mr-2"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={handleCreate}>Create</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(param.id)}>Edit</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleDelete(param.id)} className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </PageContainer>
    );
}