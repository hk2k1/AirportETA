// components/Dashboard/UrgentCall.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const TerminalCard = ({ terminal }: { terminal: number }) => {
    const [timerActive, setTimerActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
    const [selectedDuration, setSelectedDuration] = useState(180);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timeRemaining]);

    const handleActivate = () => {
        setTimeRemaining(selectedDuration);
        setTimerActive(true);
    };

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Terminal {terminal}</span>
                    <Switch />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor={`message-${terminal}`}>Message</Label>
                        <Select>
                            <SelectTrigger id={`message-${terminal}`}>
                                <SelectValue placeholder="Select message" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="message1">Taxi Needed at T{terminal}</SelectItem>
                                <SelectItem value="message2">Urgent: Taxis Required at T{terminal}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex space-x-4">
                        <div>
                            <Label htmlFor={`points-${terminal}`}>Points</Label>
                            <Input type="number" id={`points-${terminal}`} defaultValue="50" />
                        </div>
                        <div className="flex-grow">
                            <Label htmlFor={`festive-${terminal}`}>Festive</Label>
                            <Select>
                                <SelectTrigger id={`festive-${terminal}`}>
                                    <SelectValue placeholder="Select festive" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="christmas">Christmas</SelectItem>
                                    <SelectItem value="newyear">New Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label>Duration</Label>
                        <RadioGroup defaultValue="180" onValueChange={(value) => setSelectedDuration(parseInt(value))}>
                        <div className="flex flex-row space-x-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="180" id={`r1-${terminal}`} />
                                <Label htmlFor={`r1-${terminal}`}>3min</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="300" id={`r2-${terminal}`} />
                                <Label htmlFor={`r2-${terminal}`}>5min</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="420" id={`r3-${terminal}`} />
                                <Label htmlFor={`r3-${terminal}`}>7min</Label>
                            </div>
                        </div>
                        </RadioGroup>
                    </div>
                    <Button onClick={handleActivate} disabled={timerActive}>Activate</Button>
                    <div>
                        <Progress value={(timeRemaining / selectedDuration) * 100} />
                        <p className="text-center mt-2">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export function UrgentCall() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
                {[1, 2, 3, 4].map(terminal => (
                    <TerminalCard key={terminal} terminal={terminal} />
                ))}
                <Card>
                    <CardHeader>
                        <CardTitle>Message Drivers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="message-title">Title</Label>
                                <Input id="message-title" />
                            </div>
                            <div>
                                <Label htmlFor="message-content">Message</Label>
                                <Textarea id="message-content" />
                            </div>
                            <Button>Send</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <Separator />
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for notifications */}
                        <p>T1 Urgent Call activated on 25 Aug 17:05</p>
                        <p>[Points: 50] [For Christmas] via CabvieChanqi</p>
                        <p>53 drivers responded (coming to T1)</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}