"use client";

import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/contexts/events-context";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
  const { allEvents } = useEvents();
  const upcomingEvents = allEvents.filter((e) => e.status === 'upcoming');
  const pastEvents = allEvents.filter((e) => e.status === 'completed');

  const { userRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateEventClick = () => {
    if (userRole === 'faculty') {
      router.push('/admin/events');
    } else if (userRole === 'student') {
      toast({
        title: "Access Denied",
        description: "Only faculty members can create events.",
        variant: "destructive"
      });
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Upcoming Events
        </h1>
        { userRole === 'faculty' && (
          <Button onClick={handleCreateEventClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create & Manage Events
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
        {upcomingEvents.length === 0 && <p className="text-muted-foreground col-span-full">No upcoming events. Check back soon!</p>}
      </div>

      <h2 className="font-headline text-3xl md:text-4xl font-bold mt-16 mb-8 border-t pt-8">
        Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pastEvents.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
         {pastEvents.length === 0 && <p className="text-muted-foreground col-span-full">No past events yet.</p>}
      </div>
    </div>
  );
}
