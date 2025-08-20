import { TeamMemberCard } from "@/components/team-member-card";
import { faculties, coreTeam, studentMembers } from "@/lib/mock-data";

export default function TeamSection() {
  return (
    <section id="team" className="py-16">
      <header className="text-center space-y-2 mb-12">
        <p className="font-code text-accent">/Who's Who/</p>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {`<Our Team/>`}
        </h1>
      </header>

      <div className="space-y-12">
        <div>
          <h2 className="font-code text-2xl font-semibold mb-6">/Faculties/</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {faculties.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-code text-2xl font-semibold mb-6">/Core Team/</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {coreTeam.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-code text-2xl font-semibold mb-6">/Student Members/</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {studentMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
