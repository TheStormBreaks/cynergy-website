"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects } from "@/lib/mock-data";

const domains = ["All", "AI/ML", "Data Science", "Web Dev", "CySec"];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter(p => p.domain === activeTab);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center space-y-2 mb-12">
        <p className="font-code text-accent">/Projects/</p>
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {`<Showcase/>`}
        </h1>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-8">
          {domains.map(domain => (
            <TabsTrigger key={domain} value={domain}>
              {domain}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                    <ProjectCard key={`${project.name}-${index}`} {...project} />
                ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
