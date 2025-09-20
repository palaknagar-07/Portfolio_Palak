import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/data/skills';
import jellyfishIcon from '@assets/generated_images/Skill_jellyfish_icon_c14cbe00.png';

interface SkillCategoryProps {
  category: string;
  color: string;
  skillList: Array<{ name: string; level: number }>;
  index: number;
}

function SkillCategory({ category, color, skillList, index }: SkillCategoryProps) {
  return (
    <Card 
      className="p-6 bg-slate-900/40 backdrop-blur-sm border-slate-700/50 hover-elevate transition-all duration-500"
      style={{
        animationDelay: `${index * 200}ms`,
      }}
      data-testid={`card-skill-category-${index}`}
    >
      {/* Jellyfish Icon */}
      <div className="flex items-center gap-4 mb-6">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
        >
          <img 
            src={jellyfishIcon} 
            alt="Skill Jellyfish" 
            className="w-8 h-8 opacity-80"
            style={{ filter: `hue-rotate(${index * 60}deg)` }}
          />
        </div>
        <h3 
          className="text-xl font-semibold"
          style={{ color }}
          data-testid={`text-skill-category-${index}`}
        >
          {category}
        </h3>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {skillList.map((skill, skillIndex) => (
          <div key={skill.name} data-testid={`skill-${category}-${skillIndex}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-200 font-medium">{skill.name}</span>
              <span className="text-slate-400 text-sm">{skill.level}%</span>
            </div>
            <Progress 
              value={skill.level} 
              className="h-2 bg-slate-800"
              style={{
                '--progress-background': color,
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function SkillsJellyfish() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-slate-900 to-slate-800 relative" id="skills">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
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
            data-testid="heading-skills"
          >
            Skill Jellyfish
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-testid="text-skills-description">
            Swimming through the depths of technology, each jellyfish represents mastery in different domains of software development and AI/ML
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <SkillCategory
              key={skillCategory.category}
              category={skillCategory.category}
              color={skillCategory.color}
              skillList={skillCategory.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}