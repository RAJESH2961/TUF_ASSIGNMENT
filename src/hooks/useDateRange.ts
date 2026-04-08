import { useState, useCallback } from 'react';
import type { DateRange } from '../utils/dateUtils';
import { normalizeRange } from '../utils/dateUtils';

export const useDateRange = () => {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [isSelecting, setIsSelecting] = useState(false);

  const startSelection = useCallback((date: Date) => {
    setRange({ start: date, end: null });
    setIsSelecting(true);
  }, []);

  const completeSelection = useCallback((date: Date) => {
    setRange(prev => {
      if (!prev.start) {
        return { start: date, end: null };
      }
      return normalizeRange({ start: prev.start, end: date });
    });
    setIsSelecting(false);
  }, []);

  const clearSelection = useCallback(() => {
    setRange({ start: null, end: null });
    setIsSelecting(false);
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    if (!isSelecting) {
      startSelection(date);
    } else {
      completeSelection(date);
    }
  }, [isSelecting, startSelection, completeSelection]);

  return {
    range,
    isSelecting,
    handleDateClick,
    clearSelection,
  };
};
