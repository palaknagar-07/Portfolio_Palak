import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Calendar, Zap } from 'lucide-react';
import { projects } from '@/data/projects';
import SchoolingFish from '@/components/SchoolingFish';
import coralBg from '@assets/generated_images/Project_coral_formation_57b48730.png';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'planning': return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const handleViewProject = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
      console.log(`Viewing project: ${project.title}`);
    }
  };

  const handleViewCode = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
      console.log(`Viewing code for: ${project.title}`);
    }
  };

  return (
    <Card 
      className="group bg-slate-900/60 backdrop-blur-sm border-slate-700/50 hover-elevate transition-all duration-500 overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
      data-testid={`card-project-${project.id}`}
    >
      {/* Project Header with Background */}
      <CardHeader className="relative pb-4">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${coralBg})` }}
        />
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <CardTitle 
              className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors"
              data-testid={`text-project-title-${project.id}`}
            >
              {project.title}
            </CardTitle>
            <Badge 
              className={`text-xs font-medium ${getStatusColor(project.status)}`}
              data-testid={`badge-project-status-${project.id}`}
            >
              {project.status}
            </Badge>
          </div>
          <p className="text-slate-300 text-sm mb-4" data-testid={`text-project-description-${project.id}`}>
            {project.description}
          </p>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
            <Calendar className="w-3 h-3 mr-1" />
            {project.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-400 mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, techIndex) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                data-testid={`badge-tech-${project.id}-${techIndex}`}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-slate-400 mb-2">Key Features</h4>
          <div className="space-y-1">
            {project.features.slice(0, 3).map((feature, featureIndex) => (
              <div 
                key={featureIndex} 
                className="flex items-center text-sm text-slate-300"
                data-testid={`text-feature-${project.id}-${featureIndex}`}
              >
                <Zap className="w-3 h-3 mr-2 text-cyan-400" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            size="sm" 
            className="flex-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30"
            onClick={handleViewProject}
            data-testid={`button-view-project-${project.id}`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Project
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800/50"
            onClick={handleViewCode}
            data-testid={`button-view-code-${project.id}`}
          >
            <Github className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ProjectsReef() {
  const reefRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={reefRef}
      className="py-24 px-8 bg-gradient-to-b from-slate-800 to-slate-900 relative" 
      id="projects"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-teal-400 rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Schooling Fish */}
      <SchoolingFish containerRef={reefRef} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: 'Orbitron, monospace' }}
            data-testid="heading-projects"
          >
            Project Coral Reef
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-testid="text-projects-description">
            Explore the vibrant ecosystem of my projects, where each coral formation represents innovative solutions in AI/ML, data analysis, and full-stack development
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Want to collaborate on the next breakthrough project?</p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="button-lets-collaborate"
          >
            Let's Dive Deeper Together
          </Button>
        </div>
      </div>
    </section>
  );
}