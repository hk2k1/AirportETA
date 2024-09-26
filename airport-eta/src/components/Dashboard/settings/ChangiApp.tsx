// components/Dashboard/ShortCutBlacklisting.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

export function ChangiApp() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Cab@ChangiApp</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Terminal</TableHead>
                            <TableHead>Enable</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[1, 2, 3, 4].map((terminal) => (
                            <TableRow key={terminal}>
                                <TableCell>Terminal {terminal}</TableCell>
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