// components/Dashboard/Thresholds.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Thresholds() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thresholds (TH)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="th-1">TH-1: Warning</Label>
                        <Input id="th-1" type="number" defaultValue="8" />
                    </div>
                    <div>
                        <Label htmlFor="th-2">TH-2: KPI</Label>
                        <Input id="th-2" type="number" defaultValue="10" />
                    </div>
                    <div>
                        <Label htmlFor="th-3">TH-3: KPI 2</Label>
                        <Input id="th-3" type="number" defaultValue="15" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}