import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Send, Github, Linkedin, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { personalInfo } from '@/data/personalInfo';

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export default function ContactOceanFloor() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission to backend
    console.log('Contact form submitted:', formData);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <section className="py-24 px-8 bg-gradient-to-b from-slate-900 to-slate-950 relative" id="contact">
      {/* Ocean Floor Effects */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-cyan-300 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 30}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-5xl font-bold mb-6 text-white"
            style={{ fontFamily: 'Orbitron, monospace' }}
            data-testid="heading-contact"
          >
            Ocean Floor Communications
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-testid="text-contact-description">
            Ready to dive into a collaboration? Send a message through the depths and let's create something extraordinary together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-2 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
                        placeholder="Your full name"
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-2 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400"
                        placeholder="your.email@example.com"
                        required
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectType" className="text-slate-300">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger 
                        className="mt-2 bg-slate-800/50 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
                        data-testid="select-project-type"
                      >
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="ai-ml">AI/ML Project</SelectItem>
                        <SelectItem value="web-development">Web Development</SelectItem>
                        <SelectItem value="data-analysis">Data Analysis</SelectItem>
                        <SelectItem value="full-stack">Full-Stack Application</SelectItem>
                        <SelectItem value="collaboration">Research Collaboration</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-300">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="mt-2 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400 min-h-[120px]"
                      placeholder="Tell me about your project idea, collaboration opportunity, or just say hello..."
                      required
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-400 hover:to-teal-400 disabled:opacity-50"
                    data-testid="button-submit-message"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors"
                    data-testid="link-direct-email"
                  >
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm break-all">{personalInfo.email}</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Connect With Me</h3>
                <div className="space-y-3">
                  <a 
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group"
                    data-testid="link-social-github"
                  >
                    <Github className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a 
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group"
                    data-testid="link-social-linkedin"
                  >
                    <Linkedin className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Open to collaborations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span>Student projects welcome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>Research opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}