import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import TeamSection from "@/components/team-section";
import ProjectsSection from "@/components/projects-section";


export default function Home() {
  const bannerText = " *code / create / conquer ---------";
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="grid md:grid-cols-2 gap-8 items-center min-h-[60vh]">
        <div className="space-y-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
            /Welcome to <br /> Cynergy Coding Club/
          </h1>
          <Link href="/events">
            <Button variant="link" className="px-0 text-lg">
              explore more <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="text-right font-code text-lg text-foreground/80">
          <p>
            {`<This is the official coding club of Department of Computer Science and Engineer, MS Ruas! />`}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="relative w-full overflow-hidden bg-primary text-primary-foreground p-2 -rotate-2">
           <div className="whitespace-nowrap flex animate-marquee">
              <span className="text-xl font-code mx-4">{bannerText.repeat(5)}</span>
              <span className="text-xl font-code mx-4">{bannerText.repeat(5)}</span>
           </div>
        </div>
      </section>

      <TeamSection />
      <ProjectsSection />

      <section className="pt-16">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-lg font-semibold text-center md:text-left">
              Check out our upcoming events and join the community!
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" aria-label="WhatsApp Community">
                  <MessageCircle className="h-6 w-6 text-accent" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#" target="_blank" aria-label="Instagram Page">
                  <Instagram className="h-6 w-6 text-accent" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
