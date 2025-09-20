import { useEffect, useRef, useState } from 'react';
import FishSchool from '@/components/FishSchool';
import { FishType } from '@/utils/boids';

interface SchoolingFishProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

interface SchoolConfig {
  id: number;
  fishType: FishType;
  fishCount: number;
  patternType: 'circular' | 'horizontal' | 'vertical' | 'figure8';
}

export default function SchoolingFish({ containerRef }: SchoolingFishProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  // Configure 4 different schools
  const schoolConfigs: SchoolConfig[] = [
    { id: 0, fishType: 'tropical', fishCount: 18, patternType: 'circular' },
    { id: 1, fishType: 'angelfish', fishCount: 15, patternType: 'horizontal' },
    { id: 2, fishType: 'clownfish', fishCount: 20, patternType: 'vertical' },
    { id: 3, fishType: 'tropical', fishCount: 16, patternType: 'figure8' },
  ];

  // Update dimensions when container resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  // Intersection observer for performance - only animate when visible
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Start animating when 10% visible
        rootMargin: '50px' // Start animating 50px before entering viewport
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [containerRef]);

  if (!isVisible || dimensions.width === 0 || dimensions.height === 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {schoolConfigs.map((config) => (
        <FishSchool
          key={config.id}
          width={dimensions.width}
          height={dimensions.height}
          fishCount={config.fishCount}
          fishType={config.fishType}
          schoolId={config.id}
          patternType={config.patternType}
        />
      ))}
      
      {/* Performance indicator - only show in dev */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black/50 text-white text-xs p-2 rounded pointer-events-auto">
          Schools: {schoolConfigs.length} | 
          Fish: {schoolConfigs.reduce((sum, config) => sum + config.fishCount, 0)} |
          {dimensions.width}x{dimensions.height}
        </div>
      )}
    </div>
  );
}