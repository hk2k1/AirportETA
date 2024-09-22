// components/Dashboard/SearchAndTable.tsx
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRange } from "react-day-picker";

const reportTypes = [
  "All Logs",
  "Mobile App Utilization",
  "Driver Engagement",
  "Points Report",
  "App Points Conversion",
  "Most Active Drivers",
];

export const dummyLogs = [
  { id: 1, triggeredTime: '2024-03-15 10:30', title: 'High Mobile App Usage', status: 'Acknowledged', acknowledgeTime: '2024-03-15 10:35', acknowledgedBy: 'John Doe' },
  { id: 2, triggeredTime: '2024-03-15 11:45', title: 'New Driver Registration Spike', status: 'Pending', acknowledgeTime: '-', acknowledgedBy: '-' },
  { id: 3, triggeredTime: '2024-03-16 09:15', title: 'Points Conversion Alert', status: 'Acknowledged', acknowledgeTime: '2024-03-16 09:20', acknowledgedBy: 'Jane Smith' },
  { id: 4, triggeredTime: '2024-03-17 14:30', title: 'Driver Engagement Milestone', status: 'Acknowledged', acknowledgeTime: '2024-03-17 14:35', acknowledgedBy: 'Mike Johnson' },
  { id: 5, triggeredTime: '2024-03-18 08:00', title: 'Monthly Points Report Generated', status: 'Pending', acknowledgeTime: '-', acknowledgedBy: '-' },
  { id: 6, triggeredTime: '2024-03-18 13:20', title: 'App Crash Report', status: 'Investigating', acknowledgeTime: '2024-03-18 13:25', acknowledgedBy: 'Tech Support' },
  { id: 7, triggeredTime: '2024-03-19 11:00', title: 'High Driver Activity', status: 'Acknowledged', acknowledgeTime: '2024-03-19 11:05', acknowledgedBy: 'Operations Team' },
  { id: 8, triggeredTime: '2024-03-20 09:45', title: 'Payment System Alert', status: 'Resolved', acknowledgeTime: '2024-03-20 10:30', acknowledgedBy: 'Finance Dept' },
];

interface SearchAndTableProps {
  onSearch: (reportType: string, dateRange: DateRange | undefined) => void;
}

export function SearchAndTable({ onSearch }: SearchAndTableProps) {
  const [selectedReport, setSelectedReport] = useState('All Logs');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: new Date(2024, 2, 15), to: new Date(2024, 2, 20) });

  const handleSearch = () => {
    onSearch(selectedReport, dateRange);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Select onValueChange={setSelectedReport} defaultValue="All Logs">
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
        <Button className="w-[100px]" variant="secondary" onClick={handleSearch}>Search</Button>
        <Button className="w-[100px]" variant="outline">Export</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border max-h-[400px] overflow-y-auto">
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
    </>
  );
}