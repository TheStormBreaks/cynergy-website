import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  name: string;
  creators: string;
  bio: string;
  githubUrl: string;
}

export function ProjectCard({ name, creators, bio, githubUrl }: ProjectCardProps) {
  return (
    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl">{name}</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:rotate-45 group-hover:text-primary" />
          </div>
          <CardDescription className="font-code !mt-2">{creators}</CardDescription>
        </CardHeader>
        <CardDescription className="px-6 pb-6">{bio}</CardDescription>
      </Card>
    </a>
  );
}
