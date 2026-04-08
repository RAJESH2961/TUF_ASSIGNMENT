import type { DateRange } from '../utils/dateUtils';
import { WEEKDAYS, getCalendarDays } from '../utils/dateUtils';
import { DateCell } from './DateCell';

interface CalendarGridProps {
  year: number;
  month: number;
  range: DateRange;
  isSelecting: boolean;
  onDateClick: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  range,
  isSelecting,
  onDateClick,
}) => {
  const days = getCalendarDays(year, month);

  return (
    <div className="w-full" style={{ padding: '20px' }}>
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold text-text-secondary tracking-wider py-2"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <DateCell
            key={index}
            date={date}
            range={range}
            isSelecting={isSelecting}
            onClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};
