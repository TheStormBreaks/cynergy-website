import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
       <header className="text-center space-y-2 mb-12">
        <p className="font-code text-accent">/Get In Touch/</p>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {`<Contact Us/>`}
        </h1>
      </header>

      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Tony" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Stark" />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tony@starkindustries.com" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" placeholder="I have an idea for a new project..." />
        </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
    </div>
  );
}
