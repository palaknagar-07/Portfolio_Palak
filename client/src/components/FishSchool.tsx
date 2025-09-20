import { useEffect, useRef, useState, useCallback } from 'react';
import { Fish, Vector2D, FishType } from '@/utils/boids';

interface FishSchoolProps {
  width: number;
  height: number;
  fishCount?: number;
  fishType: FishType;
  schoolId: number;
  patternType: 'circular' | 'horizontal' | 'vertical' | 'figure8';
}

export default function FishSchool({ 
  width, 
  height, 
  fishCount = 18, 
  fishType,
  schoolId,
  patternType 
}: FishSchoolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mousePos = useRef<Vector2D | null>(null);
  const fishesRef = useRef<Fish[]>([]);
  const patternCenter = useRef<Vector2D>(new Vector2D(width / 2, height / 2));
  const patternTime = useRef<number>(0);

  // Initialize fish school
  const initializeFishes = useCallback(() => {
    const fishes: Fish[] = [];
    const centerX = width * (0.2 + (schoolId * 0.2)); // Distribute schools horizontally
    const centerY = height * (0.3 + Math.random() * 0.4);
    
    for (let i = 0; i < fishCount; i++) {
      // Spawn fish in a loose cluster
      const angle = (i / fishCount) * 2 * Math.PI;
      const radius = 30 + Math.random() * 40;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      fishes.push(new Fish(x, y, fishType));
    }
    
    fishesRef.current = fishes;
  }, [width, height, fishCount, fishType, schoolId]);

  // Update pattern movement
  const updatePattern = useCallback(() => {
    patternTime.current += 0.01;
    const centerX = width / 2;
    const centerY = height / 2;
    
    switch (patternType) {
      case 'circular':
        patternCenter.current = new Vector2D(
          centerX + Math.cos(patternTime.current + schoolId) * 100,
          centerY + Math.sin(patternTime.current + schoolId) * 60
        );
        break;
      case 'horizontal':
        patternCenter.current = new Vector2D(
          centerX + Math.sin(patternTime.current + schoolId * 2) * 150,
          centerY + Math.cos(patternTime.current * 0.5) * 30
        );
        break;
      case 'vertical':
        patternCenter.current = new Vector2D(
          centerX + Math.cos(patternTime.current * 0.3) * 50,
          centerY + Math.sin(patternTime.current + schoolId * 1.5) * 120
        );
        break;
      case 'figure8':
        const t = patternTime.current + schoolId;
        patternCenter.current = new Vector2D(
          centerX + Math.sin(t) * 120,
          centerY + Math.sin(t * 2) * 80
        );
        break;
    }
  }, [width, height, patternType, schoolId]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update pattern movement
    updatePattern();

    // Add gentle attraction to pattern center
    const fishes = fishesRef.current;
    for (const fish of fishes) {
      const attraction = patternCenter.current.subtract(fish.position).multiply(0.0001);
      fish.acceleration = fish.acceleration.add(attraction);
    }

    // Update each fish
    for (const fish of fishes) {
      fish.flock(fishes, mousePos.current, { width, height });
      fish.update();
      fish.render(ctx);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [width, height, updatePattern]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mousePos.current = new Vector2D(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = null;
  }, []);

  // Setup and cleanup
  useEffect(() => {
    initializeFishes();
  }, [initializeFishes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-auto"
      style={{ 
        zIndex: 10,
        opacity: 0.8
      }}
    />
  );
}