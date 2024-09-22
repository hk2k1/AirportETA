// components/Dashboard/TaxiSupply.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const terminalData = [
    { id: 1, stands: ['A', 'B', 'C', 'D'] },
    { id: 2, stands: ['North', 'South'] },
    { id: 3, stands: ['North', 'South'] },
    { id: 4, stands: ['North', 'South'] },
];

export function TaxiSupply() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Pax Queue (Main) & Taxi Supply</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Terminal</TableHead>
                            <TableHead>Taxi Stand</TableHead>
                            <TableHead>Pax Queue</TableHead>
                            <TableHead>Enable</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {terminalData.map((terminal) => (
                            terminal.stands.map((stand, index) => (
                                <TableRow key={`${terminal.id}-${stand}`}>
                                    {index === 0 && <TableCell rowSpan={terminal.stands.length}>Terminal {terminal.id}</TableCell>}
                                    <TableCell>Taxi Stand {stand}</TableCell>
                                    <TableCell>
                                        <Input type="number" defaultValue="150" className="w-20" />
                                    </TableCell>
                                    <TableCell>
                                        <Switch defaultChecked />
                                    </TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}