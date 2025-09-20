import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import ContactOceanFloor from '../ContactOceanFloor';

export default function ContactOceanFloorExample() {
  return (
    <TooltipProvider>
      <ContactOceanFloor />
      <Toaster />
    </TooltipProvider>
  );
}