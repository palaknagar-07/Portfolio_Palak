import Navigation from '@/components/Navigation';
import OceanHero from '@/components/OceanHero';
import SkillsJellyfish from '@/components/SkillsJellyfish';
import ProjectsReef from '@/components/ProjectsReef';
import AboutDeepSea from '@/components/AboutDeepSea';
import ContactOceanFloor from '@/components/ContactOceanFloor';
import Footer from '@/components/Footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navigation />
      
      <main>
        <div id="home">
          <OceanHero />
        </div>
        
        <SkillsJellyfish />
        <ProjectsReef />
        <AboutDeepSea />
        <ContactOceanFloor />
      </main>
      
      <Footer />
    </div>
  );
}