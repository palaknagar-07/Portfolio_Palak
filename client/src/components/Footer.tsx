import { Github, Linkedin, Mail, Heart, Anchor } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Ocean Floor Effects */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Anchor className="w-6 h-6 text-cyan-400" />
              <h3 
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Orbitron, monospace' }}
                data-testid="footer-brand"
              >
                {personalInfo.name}
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed" data-testid="footer-tagline">
              {personalInfo.tagline} - Exploring the infinite depths of AI, ML, and software development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
            <div className="space-y-2">
              {[
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'projects' },
                { label: 'About', id: 'about' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-slate-400 hover:text-cyan-300 transition-colors"
                  data-testid={`footer-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a 
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-cyan-300 transition-all"
                data-testid="footer-social-github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-cyan-300 transition-all"
                data-testid="footer-social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-cyan-300 transition-all"
                data-testid="footer-social-email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-slate-400 text-sm">
              Available for collaborations and exciting AI/ML projects
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm flex items-center gap-2 mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. Crafted with 
            <Heart className="w-4 h-4 text-red-400" /> 
            and endless curiosity.
          </p>
          <p className="text-slate-500 text-sm" data-testid="footer-location">
            Based in {personalInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
}