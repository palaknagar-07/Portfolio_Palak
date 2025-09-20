import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';
import BubbleField from '@/components/BubbleField';
import oceanBg from '@assets/generated_images/Ocean_hero_background_24b85bed.png';

export default function OceanHero() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const titles = [
    "AI/ML Enthusiast",
    "Data Analysis Expert", 
    "Full-Stack Developer",
    "CSE 3rd Year Student"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Ocean Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${oceanBg})` }}
      />
      
      {/* Live Animated Bubbles */}
      <BubbleField density="medium" />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h1 
          className="text-6xl md:text-8xl font-bold mb-6 text-white"
          style={{ fontFamily: 'Orbitron, monospace' }}
          data-testid="hero-name"
        >
          {personalInfo.name}
        </h1>
        
        <div className="h-16 mb-8">
          <h2 
            className="text-2xl md:text-4xl font-medium text-cyan-300 transition-all duration-500 ease-in-out"
            data-testid="hero-title"
          >
            {titles[currentTitle]}
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="hero-tagline">
          {personalInfo.tagline}
        </p>

        <p className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto" data-testid="hero-bio">
          {personalInfo.bio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-cyan-500 hover:bg-cyan-400 text-white border-cyan-400 px-8 py-4 text-lg font-semibold"
            onClick={scrollToProjects}
            data-testid="button-explore-projects"
          >
            Explore My Digital Ocean
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center">
          <a 
            href={personalInfo.social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
            data-testid="link-github"
          >
            <Github className="h-6 w-6 text-white" />
          </a>
          <a 
            href={personalInfo.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
            data-testid="link-linkedin"
          >
            <Linkedin className="h-6 w-6 text-white" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
            data-testid="link-email"
          >
            <Mail className="h-6 w-6 text-white" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-cyan-300" />
      </div>
    </section>
  );
}