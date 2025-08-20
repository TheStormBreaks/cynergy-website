import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Download } from "lucide-react";

const registeredEvents = [
  { id: '1', name: 'Hackathon 2024', date: '2024-10-26', status: 'Registered' },
  { id: '3', name: 'AI/ML Bootcamp', date: '2024-08-20', status: 'Feedback Pending' },
  { id: '4', name: 'Cyber Security Summit', date: '2024-07-11', status: 'Certificate Ready' },
];

export default function DashboardPage() {
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
              {registeredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <Badge variant={
                        event.status === 'Registered' ? 'default' : 
                        event.status === 'Feedback Pending' ? 'destructive' : 'secondary'
                    }>{event.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {event.status === "Feedback Pending" && (
                      <Button variant="outline" size="sm">
                        Submit Feedback
                      </Button>
                    )}
                    {event.status === "Certificate Ready" && (
                      <Button variant="secondary" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Certificate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
