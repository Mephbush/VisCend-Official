import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IntroAnimationProps {
  onComplete: () => void;
  language?: "en" | "ar";
}

const IntroAnimation = ({ onComplete, language = "en" }: IntroAnimationProps) => {
  const [stage, setStage] = useState(0);

  // Logo URL
  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F522d531155314df58f36d2874dd36af0%2F61d0cf36a2c94c91bd5ed392f155fa37?format=webp&width=800";

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 300),   // Background particles
      setTimeout(() => setStage(2), 800),   // Logo entrance
      setTimeout(() => setStage(3), 1400),  // Text reveal
      setTimeout(() => setStage(4), 2200),  // Final effect
      setTimeout(() => setStage(5), 3000),  // Exit animation
      setTimeout(() => onComplete(), 3600), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const brandName = language === 'ar' ? 'فِسند' : 'VisCend';
  const tagline = language === 'ar' ? 'نصمم المستقبل الرقمي' : 'Designing Digital Future';

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden",
      "bg-black",
      "transition-all duration-1000 ease-in-out",
      stage === 5 && "opacity-0 pointer-events-none"
    )}>
      {/* Animated particles background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 bg-primary/40 rounded-full",
              "transition-all duration-2000 ease-out",
              stage >= 1 ? "opacity-100" : "opacity-0"
            )}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 100}ms`,
              animation: stage >= 1 ? 'float 3s infinite ease-in-out' : 'none',
            }}
          />
        ))}
        
        {/* Central glow effect */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-96 h-96 rounded-full blur-3xl",
          "bg-gradient-radial from-primary/20 via-secondary/10 to-transparent",
          "transition-all duration-2000 ease-out",
          stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo with dramatic entrance */}
        <div className={cn(
          "mb-8 transition-all duration-1200 ease-out transform",
          stage >= 2 ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-12"
        )}>
          <div className={cn(
            "relative inline-block p-6 rounded-full",
            "before:absolute before:inset-0 before:rounded-full before:border-2 before:border-primary/50",
            "before:transition-all before:duration-1000",
            stage >= 2 && "before:animate-spin before:border-primary"
          )}>
            <img 
              src={logoUrl} 
              alt={brandName}
              className={cn(
                "h-24 w-auto relative z-10 transition-all duration-1000",
                stage >= 3 && "drop-shadow-[0_0_40px_hsl(var(--primary)/0.8)]"
              )}
            />
          </div>
        </div>

        {/* Brand name with typewriter effect */}
        <div className={cn(
          "transition-all duration-800 ease-out transform",
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className={cn(
            "text-5xl md:text-6xl font-bold mb-4 text-white",
            "bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent",
            "animate-pulse",
            language === 'ar' ? "font-arabic" : ""
          )}>
            {brandName}
          </h1>
        </div>

        {/* Tagline with slide effect */}
        <div className={cn(
          "transition-all duration-1000 ease-out transform delay-300",
          stage >= 3 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        )}>
          <p className={cn(
            "text-xl md:text-2xl font-light text-gray-300 mb-8",
            language === 'ar' ? "font-arabic" : ""
          )}>
            {tagline}
          </p>
        </div>

        {/* Loading bar */}
        <div className={cn(
          "mx-auto w-48 h-1 bg-gray-800 rounded-full overflow-hidden",
          "transition-all duration-500 ease-out",
          stage >= 3 ? "opacity-100" : "opacity-0"
        )}>
          <div className={cn(
            "h-full bg-gradient-to-r from-primary to-secondary rounded-full",
            "transition-all duration-2000 ease-out",
            stage >= 4 ? "w-full" : "w-0"
          )} />
        </div>

        {/* Completion pulse effect */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-full h-full rounded-full border border-primary/30",
          "transition-all duration-1000 ease-out",
          stage >= 4 ? "scale-150 opacity-0" : "scale-0 opacity-0"
        )} />
      </div>

    </div>
  );
};

export default IntroAnimation;
