// components/Dashboard/ShortCutBlacklisting.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ShortCutBlacklisting() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Short Cut Blacklisting</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Terminal</TableHead>
                            <TableHead>THA Count</TableHead>
                            <TableHead>Enable</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3, 4].map((terminal) => (
                            <TableRow key={terminal}>
                                <TableCell>Terminal {terminal}</TableCell>
                                <TableCell>
                                    <Input type="number" defaultValue="4" className="w-16" />
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