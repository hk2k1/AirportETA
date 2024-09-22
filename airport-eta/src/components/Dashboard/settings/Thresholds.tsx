// components/Dashboard/Thresholds.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function Thresholds() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Thresholds (TH)</CardTitle>
                <Separator />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Label htmlFor="th-1" className="w-32">TH-1: Warning</Label>
                        <Input id="th-1" type="number" defaultValue="8" className="w-20" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Label htmlFor="th-2" className="w-32">TH-2: KPI</Label>
                        <Input id="th-2" type="number" defaultValue="10" className="w-20" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Label htmlFor="th-3" className="w-32">TH-3: KPI 2</Label>
                        <Input id="th-3" type="number" defaultValue="15" className="w-20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}