export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isInRange = (date: Date, range: DateRange): boolean => {
  if (!range.start || !range.end) return false;
  
  const start = new Date(range.start);
  const end = new Date(range.end);
  const current = new Date(date);
  
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  current.setHours(12, 0, 0, 0);
  
  return current >= start && current <= end;
};

export const isRangeStart = (date: Date, range: DateRange): boolean => {
  return range.start ? isSameDay(date, range.start) : false;
};

export const isRangeEnd = (date: Date, range: DateRange): boolean => {
  return range.end ? isSameDay(date, range.end) : false;
};

export const formatDateRange = (range: DateRange): string => {
  if (!range.start && !range.end) return '';
  
  // Convert to Date objects if they're strings
  const start = range.start ? new Date(range.start) : null;
  const end = range.end ? new Date(range.end) : null;
  
  if (start && !end) {
    return formatDate(start);
  }
  if (start && end) {
    if (isSameDay(start, end)) {
      return formatDate(start);
    }
    return `${formatDate(start)} – ${formatDate(end)}`;
  }
  return '';
};

export const formatDate = (date: Date): string => {
  const month = MONTHS[date.getMonth()].slice(0, 3);
  const day = date.getDate();
  return `${month} ${day}`;
};

export const getCalendarDays = (year: number, month: number): (Date | null)[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days: (Date | null)[] = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  
  return days;
};

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range.start || !range.end) return range;
  
  if (range.start > range.end) {
    return { start: range.end, end: range.start };
  }
  
  return range;
};

export const getMonthKey = (year: number, month: number): string => {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
};
