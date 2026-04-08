import { MONTHS } from '../utils/dateUtils';

interface HeroSectionProps {
  month: number;
  year: number;
}

const MONTH_IMAGES = [
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&h=600&fit=crop',
  'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=1200&h=600&fit=crop',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ month, year }) => {
  const imageUrl = MONTH_IMAGES[month];
  const monthName = MONTHS[month];

  return (
    <div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-xl">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      
      {/* Orange Gradient Overlay - Dashboard Style */}
      <div className="absolute inset-0">
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#F97316', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#FB923C', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#EA580C', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          {/* Bottom diagonal shape with orange gradient */}
          <path
            d="M 0 60 L 0 100 L 100 100 L 100 40 Z"
            fill="url(#orangeGradient)"
          />
        </svg>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-orange/20 to-transparent" />
      
      {/* Month and Year Text */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-right z-10">
        <div className="text-white">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-glow">
            {year}
          </div>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-primary-orange text-glow">
            {monthName}
          </div>
        </div>
      </div>
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
    </div>
  );
};
