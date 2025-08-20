"use client";

import { useAuth } from "@/contexts/auth-context";
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

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "upcoming" | "completed";
}

export function EventCard({ id, name, description, date, status }: EventCardProps) {
  const { userRole } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegisterClick = () => {
    if (userRole === 'student') {
        toast({ title: "Registration Successful!", description: `You have registered for ${name}.` });
        router.push('/dashboard');
    } else if (userRole === 'faculty') {
        toast({ title: "Action not available", description: "Faculty members cannot register for events." });
    } else {
        router.push('/login');
    }
  };

  return (
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
          <Button onClick={handleRegisterClick} className="w-full">
            Register Now
          </Button>
        ) : (
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">Fill Feedback & Get Certificate</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
