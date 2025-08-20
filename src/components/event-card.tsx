
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useEvents } from "@/contexts/events-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { EventRegistrationDialog } from "./event-registration-dialog";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "upcoming" | "completed";
  formFields?: string[];
}

export function EventCard({ id, name, description, date, status, formFields }: EventCardProps) {
  const { userRole } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { isRegistered } = useEvents();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAlreadyRegistered = isRegistered(id);

  const handleRegisterClick = () => {
    if (userRole === 'student') {
        setIsDialogOpen(true);
    } else if (userRole === 'faculty') {
        toast({ title: "Action not available", description: "Faculty members cannot register for events." });
    } else {
        router.push('/login');
    }
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
              <CardTitle className="font-headline text-2xl">{name}</CardTitle>
              <Badge variant={status === 'upcoming' ? 'default' : 'secondary'}>{status}</Badge>
          </div>
          <CardDescription>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          {status === "upcoming" ? (
            <Button onClick={handleRegisterClick} className="w-full" disabled={isAlreadyRegistered}>
              {isAlreadyRegistered ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Registered
                </>
              ) : (
                'Register Now'
              )}
            </Button>
          ) : (
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">View Status</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
      {formFields && (
        <EventRegistrationDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            eventName={name}
            eventId={id}
            formFields={formFields}
        />
      )}
    </>
  );
}
