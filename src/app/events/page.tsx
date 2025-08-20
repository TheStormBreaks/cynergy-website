import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/mock-data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const upcomingEvents = events.filter((e) => e.status === 'upcoming');
  const pastEvents = events.filter((e) => e.status === 'completed');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Upcoming Events
        </h1>
        <Button asChild>
          <Link href="/admin/create-event">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      <h2 className="font-headline text-3xl md:text-4xl font-bold mt-16 mb-8 border-t pt-8">
        Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
