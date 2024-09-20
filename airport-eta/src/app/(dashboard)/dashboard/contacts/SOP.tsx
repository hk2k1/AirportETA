// components/Dashboard/SOP.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sopData = [
    {
        scenario: "No. of Pax Increasing at One Taxi Stand",
        conditions: [
            "Pax wait time is 10 mins",
            "Pax wait time is 15 mins",
            "Pax wait time between the 2 taxi stands differs by 10 min"
        ],
        actions: [
            "Do not divert passengers",
            "Continue Kerbside Boarding",
            "Divert to terminal's alternative taxi stand"
        ]
    },
    {
        scenario: "Congestion at the Terminal (both taxi stands)",
        conditions: [
            "Tailback >20 pax for >30 min (for taxi stands at Terminal A)",
            "Pax queue < 50% full at Terminal B with no incoming pax at baggage claim hall for 10 min",
            "Taxi supply at Terminal A insufficient, but Taxi supply at Terminal B enough"
        ],
        actions: [
            "Alternative transportation should be offered to suitable passengers",
            "Divert pax from congested taxi stand (A) to other side (B)"
        ]
    }
];

export function SOP() {
    return (
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Electronic (E) - SOP for Taxi Cell</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Scenario</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sopData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.scenario}</TableCell>
                                <TableCell>
                                    <ul className="list-disc pl-4">
                                        {item.conditions.map((condition, i) => (
                                            <li key={i}>{condition}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell>
                                    <ul className="list-disc pl-4">
                                        {item.actions.map((action, i) => (
                                            <li key={i}>{action}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}