import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, MapPin, Calendar, BookOpen, Award } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';

export default function AboutDeepSea() {
  const handleDownloadResume = () => {
    console.log('Downloading resume...');
    // TODO: Implement actual resume download
    window.open(personalInfo.resumeUrl, '_blank');
  };

  // TODO: Replace with real education and experience data
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science Engineering",
      institution: "University Name", // TODO: Replace with real university
      year: "2022-2026",
      status: "Currently pursuing 3rd year"
    }
  ];

  const experience = [
    {
      role: "AI/ML Research Assistant",
      organization: "University Research Lab", // TODO: Replace with real experience
      duration: "2023-Present",
      description: "Working on machine learning projects and data analysis research"
    }
  ];

  const achievements = [
    "Dean's List - Academic Excellence",
    "Hackathon Winner - AI/ML Track",
    "Open Source Contributor",
    "Technical Workshop Presenter"
  ];

  return (
    <section className="py-24 px-8 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative" id="about">
      {/* Deep Sea Background Effects */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: 'Orbitron, monospace' }}
            data-testid="heading-about"
          >
            Deep Sea Exploration
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-testid="text-about-description">
            Discover the depths of my journey through the vast ocean of computer science and artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Personal Info & Bio */}
          <div className="space-y-8">
            {/* Profile Card */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    {/* TODO: Replace with real avatar image */}
                    <span className="text-2xl font-bold text-white" data-testid="text-avatar-initials">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white" data-testid="text-about-name">
                      {personalInfo.name}
                    </h3>
                    <p className="text-cyan-300 font-medium" data-testid="text-about-title">
                      {personalInfo.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400" data-testid="text-about-location">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6" data-testid="text-about-bio">
                  {personalInfo.bio}
                </p>

                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500"
                  onClick={handleDownloadResume}
                  data-testid="button-download-resume"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Key Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3"
                      data-testid={`text-achievement-${index}`}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Education & Experience */}
          <div className="space-y-8">
            {/* Education */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  Education
                </h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} data-testid={`card-education-${index}`}>
                      <h4 className="font-semibold text-white mb-2">{edu.degree}</h4>
                      <p className="text-slate-300 mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                          <Calendar className="w-3 h-3 mr-1" />
                          {edu.year}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                          {edu.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Experience
                </h3>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} data-testid={`card-experience-${index}`}>
                      <h4 className="font-semibold text-white mb-2">{exp.role}</h4>
                      <p className="text-slate-300 mb-2">{exp.organization}</p>
                      <p className="text-slate-400 text-sm mb-3">{exp.description}</p>
                      <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                        {exp.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Interests */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-6">Research Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'Data Science', 'Natural Language Processing', 'Computer Vision', 'AI Ethics'].map((interest, index) => (
                    <Badge 
                      key={interest} 
                      variant="secondary" 
                      className="bg-purple-500/20 text-purple-300 border-purple-500/50"
                      data-testid={`badge-interest-${index}`}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}