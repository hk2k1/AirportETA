// components/Dashboard/PaxQueueAndTaxiSupply.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TaxiSupply() {
    return (
        <Card className="col-span-2 row-span-2">
            <CardHeader>
                <CardTitle>Pax Queue (Main) & Taxi Supply</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Terminal</TableHead>
                            <TableHead>Pax Queue</TableHead>
                            <TableHead>Enable</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3, 4].map((terminal) => (
                            <TableRow key={terminal}>
                                <TableCell>Terminal {terminal}</TableCell>
                                <TableCell>
                                    <Input type="number" defaultValue="150" className="w-20" />
                                </TableCell>
                                <TableCell>
                                    <Switch defaultChecked={terminal <= 2} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}