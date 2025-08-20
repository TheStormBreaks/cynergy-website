import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TeamMemberCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

export function TeamMemberCard({ name, title, imageUrl }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors duration-300 w-full">
      <CardContent className="p-0">
        <div className="aspect-[3/4] relative">
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover"
            data-ai-hint="portrait professional"
          />
        </div>
        <Separator />
        <div className="p-4 text-center">
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
