import type { DateRange } from '../utils/dateUtils';
import { isToday, isInRange, isRangeStart, isRangeEnd } from '../utils/dateUtils';

interface DateCellProps {
  date: Date | null;
  range: DateRange;
  isSelecting: boolean;
  onClick: (date: Date) => void;
}

export const DateCell: React.FC<DateCellProps> = ({ date, range, onClick }) => {
  if (!date) {
    return <div className="aspect-square" />;
  }

  const today = isToday(date);
  const inRange = isInRange(date, range);
  const rangeStart = isRangeStart(date, range);
  const rangeEnd = isRangeEnd(date, range);
  const isEdge = rangeStart || rangeEnd;
  const isSaturday = date.getDay() === 6;
  const isSunday = date.getDay() === 0;
  const isWeekend = isSaturday || isSunday;

  const handleClick = () => {
    onClick(date);
  };

  return (
    <div className="relative aspect-square flex items-center justify-center p-0.5">
      <button style={{ padding: '5px' }}
        onClick={handleClick}
        className={`
          w-full h-full flex items-center justify-center
          text-xs md:text-sm font-semibold
          transition-glow transition-smooth
          focus:outline-none focus:ring-1 focus:ring-primary-orange focus:ring-offset-1 focus:ring-offset-card-bg
          ${isEdge ? 'gradient-orange text-white rounded-full scale-75 glow-orange-strong z-10 shadow-xl' : ''}
          ${inRange && !isEdge ? 'bg-gradient-to-r from-primary-orange/20 to-deep-orange/10 text-primary-orange rounded-full scale-75' : ''}
          ${!inRange && !isEdge ? 'text-text-secondary hover:text-white hover:bg-elevated-card hover:glow-orange rounded-md' : ''}
          ${isWeekend && !inRange && !isEdge ? 'text-primary-orange/70' : ''}
          ${today && !isEdge ? 'ring-1 ring-primary-orange rounded-full' : ''}
        `}
      >
        {date.getDate()}
      </button>
      
      {/* Range background connector - continuous bar effect */}
      {inRange && !isEdge && (
        <div className="absolute inset-y-0.5 -left-0.5 -right-0.5 bg-gradient-to-r from-primary-orange/10 via-primary-orange/15 to-primary-orange/10 -z-10 rounded-sm" />
      )}
      
      {/* Glow effect for edges */}
      {isEdge && (
        <div className="absolute inset-0 rounded-full bg-primary-orange/20 blur-lg -z-10 animate-pulse" />
      )}
    </div>
  );
};
