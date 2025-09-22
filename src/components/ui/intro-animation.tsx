import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IntroAnimationProps {
  onComplete: () => void;
  language?: "en" | "ar";
}

const IntroAnimation = ({ onComplete, language = "en" }: IntroAnimationProps) => {
  const [stage, setStage] = useState(0);

  // Hosted logo URL
  const logoUrl = "https://cdn.builder.io/api/v1/image/assets%2F522d531155314df58f36d2874dd36af0%2F61d0cf36a2c94c91bd5ed392f155fa37?format=webp&width=800";

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),   // Logo scale in
      setTimeout(() => setStage(2), 1000),  // Logo glow effect
      setTimeout(() => setStage(3), 1600),  // Company name appear
      setTimeout(() => setStage(4), 2400),  // Tagline appear
      setTimeout(() => setStage(5), 3200),  // Description appear
      setTimeout(() => setStage(6), 4200),  // Fade out start
      setTimeout(() => onComplete(), 4800), // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const brandName = language === 'ar' ? 'فِسند' : 'VisCend';
  const companyName = language === 'ar' ? `شركة ${brandName} للتقنية` : `${brandName} Technologies`;
  const tagline = language === 'ar' ? 'شريكك في النجاح الرقمي' : 'Your Digital Success Partner';
  const description = language === 'ar' 
    ? 'نساعدك لتحقيق أهدافك في العالم الرقمي من خلال حلول مبتكرة وتصميمات بصرية مبهرة'
    : 'We help you achieve your goals in the digital world through innovative solutions and striking visual design.';

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden",
      "bg-gradient-to-br from-background via-background to-background/98",
      "transition-all duration-700 ease-out",
      stage === 6 && "opacity-0 pointer-events-none"
    )}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20",
          "bg-gradient-radial from-primary/30 to-transparent",
          "transition-all duration-2000 ease-out",
          stage >= 2 ? "scale-150 opacity-10" : "scale-0 opacity-0"
        )} />
        <div className={cn(
          "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15",
          "bg-gradient-radial from-secondary/30 to-transparent",
          "transition-all duration-2000 ease-out delay-300",
          stage >= 2 ? "scale-150 opacity-8" : "scale-0 opacity-0"
        )} />
      </div>

      <div className="relative z-10 text-center space-y-8 max-w-2xl px-8">
        {/* Logo with Professional Animation */}
        <div className={cn(
          "relative flex items-center justify-center",
          "transition-all duration-1200 ease-out transform",
          stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
        )}>
          <div className={cn(
            "relative p-4 rounded-2xl",
            "transition-all duration-1000 ease-out",
            stage >= 2 && "shadow-[0_0_80px_hsl(var(--primary)/0.6)]"
          )}>
            <img 
              src={logoUrl} 
              alt={brandName}
              className={cn(
                "h-20 w-auto transition-all duration-1000 ease-out",
                stage >= 2 && "drop-shadow-[0_0_30px_hsl(var(--primary)/0.8)]"
              )}
            />
          </div>
        </div>

        {/* Brand Name with Gradient Effect */}
        <div className={cn(
          "transition-all duration-1000 ease-out transform",
          stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h1 className={cn(
            "text-4xl md:text-5xl font-bold mb-2",
            "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
            "transition-all duration-800 ease-out"
          )}>
            {companyName}
          </h1>
        </div>

        {/* Tagline */}
        <div className={cn(
          "transition-all duration-1000 ease-out transform delay-200",
          stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <p className="text-xl md:text-2xl font-medium text-foreground/90">
            {tagline}
          </p>
        </div>

        {/* Description */}
        <div className={cn(
          "transition-all duration-1000 ease-out transform delay-400",
          stage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <p className={cn(
            "text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed",
            language === 'ar' ? "text-right" : "text-center"
          )}>
            {description}
          </p>
        </div>

        {/* Progress indicator */}
        <div className={cn(
          "flex justify-center mt-8",
          "transition-all duration-500 ease-out",
          stage >= 5 ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  stage >= 5 ? "bg-primary animate-pulse" : "bg-muted"
                )}
                style={{ animationDelay: `${dot * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
