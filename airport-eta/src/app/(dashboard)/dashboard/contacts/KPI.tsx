// components/Dashboard/KPIs.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KPI() {
    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>KPIs / General Principles</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    <li><strong>KPI 1:</strong> Pax wait time ≤ 10 min</li>
                    <li><strong>KPI 2:</strong> Pax queue cannot block main thoroughfare</li>
                    <li><strong>Congestion:</strong> Tailback ≥ 20 pax for ≥ 5 min</li>
                </ul>
            </CardContent>
        </Card>
    );
}