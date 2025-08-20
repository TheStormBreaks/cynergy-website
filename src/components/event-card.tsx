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

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  status: "upcoming" | "completed";
}

export function EventCard({ id, name, description, date, status }: EventCardProps) {
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
          <Button asChild className="w-full">
            <Link href="/login">Register Now</Link>
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
