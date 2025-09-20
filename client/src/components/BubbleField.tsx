interface BubbleFieldProps {
  density?: 'low' | 'medium' | 'high';
}

export default function BubbleField({ density = 'medium' }: BubbleFieldProps) {
  // Adjust bubble counts based on density
  const getDensitySettings = (density: string) => {
    switch (density) {
      case 'low':
        return { micro: 25, feature: 4 };
      case 'high':
        return { micro: 80, feature: 15 };
      default: // medium
        return { micro: 50, feature: 8 };
    }
  };

  const settings = getDensitySettings(density);

  // Generate random properties for each bubble
  const generateBubble = (index: number, isMicro: boolean) => {
    const size = isMicro 
      ? 2 + Math.random() * 3 // 2-5px for micro bubbles
      : 10 + Math.random() * 12; // 10-22px for feature bubbles
    
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * (isMicro ? 12 : 24); // stagger start times
    const duration = isMicro 
      ? 8 + Math.random() * 4 // 8-12s for micro
      : 14 + Math.random() * 10; // 14-24s for feature
    
    const drift = (Math.random() - 0.5) * (isMicro ? 30 : 60); // horizontal drift in px
    const opacity = isMicro 
      ? 0.25 + Math.random() * 0.1 // 0.25-0.35
      : 0.25 + Math.random() * 0.25; // 0.25-0.5
    
    const blur = isMicro ? 1 : 0; // slight blur for micro bubbles
    
    return {
      '--size': `${size}px`,
      '--left': `${left}%`,
      '--delay': `${delay}s`,
      '--duration': `${duration}s`,
      '--drift': `${drift}px`,
      '--opacity': opacity,
      '--blur': `${blur}px`,
    } as React.CSSProperties;
  };

  return (
    <div className="bubble-field absolute inset-0 pointer-events-none overflow-hidden">
      {/* Micro Bubbles Layer */}
      <div className="bubble-layer absolute inset-0">
        {[...Array(settings.micro)].map((_, i) => (
          <span
            key={`micro-${i}`}
            className="bubble bubble-micro"
            style={generateBubble(i, true)}
          />
        ))}
      </div>
      
      {/* Feature Bubbles Layer */}
      <div className="bubble-layer absolute inset-0">
        {[...Array(settings.feature)].map((_, i) => (
          <span
            key={`feature-${i}`}
            className="bubble bubble-feature"
            style={generateBubble(i, false)}
          />
        ))}
      </div>
    </div>
  );
}