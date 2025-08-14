"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const activityTypes = [
    { id: "meditation", name: "Meditation" },
    { id: "exercise", name: "Exercise" },
    { id: "walking", name: "Walking" },
    { id: "reading", name: "Reading" },
    { id: "journaling", name: "Journaling" },
    { id: "therapy", name: "Therapy Session" },
];


export function ActivityLogger({ open, onOpenChange, onActivityLogged }) {
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        setTimeout(() => {
            console.log({
                type, name, duration, description
            })
            setType("")
            setName("")
            setDuration("")
            setDescription("")
            setIsLoading("")

            alert("Activity Logged (mock)!")
            onOpenChange(false)
        }, 1000)
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Log Activity</DialogTitle>
                    <DialogDescription>Record your wellnewss activity</DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <Label>Activity Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select activity type" />
                            </SelectTrigger>
                            <SelectContent>
                                {activityTypes.map((t) => (
                                    <SelectItem key={t.id} value={t.id}>
                                        {t.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-3 mb-2">
                        <Label>Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Morning Meditation, Evening Walk, etc."
                        />
                    </div>
                    <div className="space-y-3 mb-2">
                        <Label>Duration (minutes)</Label>
                        <Input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="15"
                        />
                    </div>
                    <div className="space-y-3 mb-3">
                        <Label>Description (optional)</Label>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="How did it go?"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost">Cancel</Button>
                        <Button type="submit" disabled>Save Activity</Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}