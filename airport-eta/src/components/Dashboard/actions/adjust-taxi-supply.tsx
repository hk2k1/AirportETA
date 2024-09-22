// components/Dashboard/AdjustTaxiSupply.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from '@/components/ui/separator';

const TerminalCard = ({ terminal }: { terminal: number }) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Terminal {terminal}</span>
          <Button variant="outline" size="sm">View schedule</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <Label htmlFor={`date-${terminal}`}>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor={`start-time-${terminal}`}>Start time</Label>
            <Input type="time" id={`start-time-${terminal}`} />
          </div>
          <div>
            <Label htmlFor={`end-time-${terminal}`}>End time</Label>
            <Input type="time" id={`end-time-${terminal}`} />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor={`manual-adjust-${terminal}`}>Manual adjust value</Label>
          <Input type="number" id={`manual-adjust-${terminal}`} />
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline">Clear all</Button>
          <div className="flex items-center space-x-2">
            <Switch id={`enable-${terminal}`} />
            <Label htmlFor={`enable-${terminal}`}>Enable</Label>
          </div>
          <Button>Confirm</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function AdjustTaxiSupply() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-4">
        {[1, 2, 3, 4].map(terminal => (
          <TerminalCard key={terminal} terminal={terminal} />
        ))}
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent>
            {/* Placeholder for schedule content */}
            <p>Schedule content goes here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}