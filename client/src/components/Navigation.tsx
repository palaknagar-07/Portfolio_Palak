import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // Ocean theme defaults to dark
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    console.log('Theme toggled to:', !isDark ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent'
      }`}
      data-testid="navigation"
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold text-white hover:text-cyan-300 transition-colors"
            style={{ fontFamily: 'Orbitron, monospace' }}
            data-testid="button-logo"
          >
            {personalInfo.name.split(' ').map(n => n[0]).join('')}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action || (() => scrollToSection(item.id))}
                className="text-slate-300 hover:text-cyan-300 transition-colors font-medium"
                data-testid={`nav-link-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-slate-900/95 backdrop-blur-md rounded-lg border border-slate-700/50">
            <div className="flex flex-col space-y-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action || (() => scrollToSection(item.id))}
                  className="text-slate-300 hover:text-cyan-300 transition-colors font-medium text-left py-2"
                  data-testid={`mobile-nav-link-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-700/50">
                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                  data-testid="button-mobile-theme-toggle"
                >
                  {isDark ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}