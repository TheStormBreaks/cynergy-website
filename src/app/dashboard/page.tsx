
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
import { Download, FilePenLine } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { registeredEvents, getEventById } = useEvents();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          My Dashboard
        </h1>
        <p className="text-muted-foreground">
          View your event registrations and download certificates.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>My Events</CardTitle>
          <CardDescription>
            A list of all events you have registered for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {registeredEvents.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
                <Button asChild>
                    <Link href="/events">Explore Events</Link>
                </Button>
            </div>
          ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Event Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {registeredEvents.map((reg) => {
                    const event = getEventById(reg.eventId);
                    if (!event) return null;

                    const getStatusText = () => {
                        if (event.status === 'completed') {
                            return reg.feedbackSubmitted ? 'Certificate Ready' : 'Feedback Pending';
                        }
                        return 'Registered';
                    };

                    const statusText = getStatusText();

                    return (
                        <TableRow key={reg.eventId}>
                        <TableCell className="font-medium">{event.name}</TableCell>
                        <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <Badge variant={
                                statusText === 'Registered' ? 'default' : 
                                statusText === 'Feedback Pending' ? 'destructive' : 'secondary'
                            }>{statusText}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {statusText === "Feedback Pending" && (
                            <Button variant="outline" size="sm">
                                <FilePenLine className="mr-2 h-4 w-4" />
                                Submit Feedback
                            </Button>
                            )}
                            {statusText === "Certificate Ready" && (
                            <Button variant="secondary" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Certificate
                            </Button>
                            )}
                        </TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
