
"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generatePosterAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useEvents } from "@/contexts/events-context";
import { useRouter } from "next/navigation";

const formFields = [
  { id: "name", label: "Name", required: true },
  { id: "email", label: "Email", required: true },
  { id: "number", label: "Phone Number" },
  { id: "class", label: "Class/Year" },
  { id: "regNo", label: "Registration No." },
  { id: "branch", label: "Branch" },
  { id: "batch", label: "Batch" },
];

export default function CreateEventPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { addEvent } = useEvents();
    const [posterLoading, setPosterLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [posterUri, setPosterUri] = useState<string | null>(null);
    const [posterDescription, setPosterDescription] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [selectedFields, setSelectedFields] = useState<string[]>(['name', 'email']);

    const handleFieldToggle = (fieldId: string) => {
        setSelectedFields(prev => 
            prev.includes(fieldId) 
                ? prev.filter(id => id !== fieldId)
                : [...prev, fieldId]
        );
    };
    
    const handleCreateEvent = async () => {
        if (!eventName || !eventDescription) {
            toast({ title: "Error", description: "Please provide an event name and description.", variant: "destructive" });
            return;
        }

        const newEvent = {
            name: eventName,
            description: eventDescription,
            date: new Date().toISOString(),
            status: 'upcoming' as 'upcoming' | 'completed',
            formFields: selectedFields,
        };

        setCreateLoading(true);
        try {
            await addEvent(newEvent);
            toast({ title: "Event Created!", description: `${eventName} is now live.` });
            router.push("/admin/events");
        } catch (error) {
            toast({ title: "Error", description: "Could not create event. Please try again.", variant: "destructive" });
        } finally {
            setCreateLoading(false);
        }
    };

    const handleGeneratePoster = async () => {
        if (!posterDescription) {
            toast({ title: "Error", description: "Please enter an event description for the poster.", variant: "destructive" });
            return;
        }
        setPosterLoading(true);
        setPosterUri(null);
        const result = await generatePosterAction({ eventDescription: posterDescription });
        if (result.error) {
            toast({ title: "Poster Generation Failed", description: result.error, variant: "destructive" });
        } else if (result.posterDataUri) {
            setPosterUri(result.posterDataUri);
            toast({ title: "Poster Generated!", description: "The AI has created your event poster." });
        }
        setPosterLoading(false);
    };

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Create New Event
        </h1>
        <p className="text-muted-foreground">
          Fill in the details for your new event.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details & Registration Form</CardTitle>
              <CardDescription>
                Define your event and select the fields for student registration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input id="eventName" placeholder="e.g., Annual Hackathon" value={eventName} onChange={e => setEventName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="eventDescription">Event Description</Label>
                    <Textarea id="eventDescription" placeholder="Describe what the event is about." value={eventDescription} onChange={e => setEventDescription(e.target.value)} />
                </div>
              <Label>Registration Form Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border p-4">
                {formFields.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox 
                        id={field.id}
                        checked={selectedFields.includes(field.id)}
                        onCheckedChange={() => handleFieldToggle(field.id)}
                        disabled={field.required}
                    />
                    <Label htmlFor={field.id} className="font-normal">
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleCreateEvent} disabled={createLoading}>
                    {createLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Event
                </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>AI Poster Generator</CardTitle>
              <CardDescription>
                Describe the event, and our AI will create a poster for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="e.g., A futuristic hackathon about AI, with glowing circuits and a cityscape."
                    value={posterDescription}
                    onChange={(e) => setPosterDescription(e.target.value)}
                />
              <Button onClick={handleGeneratePoster} disabled={posterLoading}>
                {posterLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Poster
              </Button>
              {posterUri && (
                <div className="mt-4 border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Generated Poster:</h3>
                    <Image src={posterUri} width={512} height={512} alt="Generated Event Poster" className="rounded-md" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
