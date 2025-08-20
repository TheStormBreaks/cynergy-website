
"use client";

import { useEvents } from "@/contexts/events-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Gauge, PlusCircle, Users } from "lucide-react";
import Link from "next/link";
import { generateReportAction } from "./actions";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { EventRegistrationsDialog } from "@/components/event-registrations-dialog";

export default function AdminEventsPage() {
    const { allEvents } = useEvents();
    const { toast } = useToast();
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});
    const [registrationsOpen, setRegistrationsOpen] = React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState<any>(null);

    const handleViewRegistrations = (event: any) => {
      setSelectedEvent(event);
      setRegistrationsOpen(true);
    };

    const handleGenerateReport = async (eventId: string, eventName: string) => {
        setLoadingStates(prev => ({...prev, [eventId]: true}));
        const result = await generateReportAction({
            eventName: eventName,
            feedbackSummary: "Overall positive, but some requested more snacks. (Sample data)",
            participationSummary: "125 students registered, 110 attended. (Sample data)",
        });

        if (result.error) {
            toast({ title: "Report Generation Failed", description: result.error, variant: "destructive" });
        } else if (result.report) {
            // For now, just show a toast. In a real app, you might show a dialog or download the report.
             toast({ 
                title: `Report for ${eventName}`, 
                description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4"><code className="text-white">{result.report}</code></pre>,
                duration: 20000, // Show for longer
            });
        }
        setLoadingStates(prev => ({...prev, [eventId]: false}));
    }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
              <h1 className="font-headline text-4xl md:text-5xl font-bold">
              Faculty Dashboard
              </h1>
              <p className="text-muted-foreground">
              Manage all club events from one place.
              </p>
          </div>
          <Button asChild>
            <Link href="/admin/create-event">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Event
            </Link>
          </Button>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>All Events</CardTitle>
            <CardDescription>
              A list of all upcoming and past events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewRegistrations(event)}>
                         <Users className="mr-2 h-4 w-4" /> Registrations
                      </Button>
                       {event.status === 'completed' ? (
                          <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleGenerateReport(event.id, event.name)}
                              disabled={loadingStates[event.id]}
                          >
                              <FileText className="mr-2 h-4 w-4" />
                               {loadingStates[event.id] ? "Generating..." : "Generate Report"}
                          </Button>
                       ) : (
                          <Button variant="ghost" size="sm">
                              <Gauge className="mr-2 h-4 w-4" /> Manage
                          </Button>
                       )}
                    </TableCell>
                  </TableRow>
                ))}
                {allEvents.length === 0 && (
                  <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                          No events found.
                      </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {selectedEvent && (
        <EventRegistrationsDialog 
            isOpen={registrationsOpen}
            onOpenChange={setRegistrationsOpen}
            eventName={selectedEvent.name}
            eventId={selectedEvent.id}
            formFields={selectedEvent.formFields || []}
        />
      )}
    </>
  );
}
