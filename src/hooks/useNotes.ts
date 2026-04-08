import { useState, useEffect, useCallback } from 'react';
import type { DateRange } from '../utils/dateUtils';
import { getMonthKey } from '../utils/dateUtils';

interface Note {
  id: string;
  content: string;
  monthKey: string;
  range?: DateRange;
  createdAt: number;
}

const STORAGE_KEY = 'calendar-notes';

export const useNotes = (year: number, month: number, selectedRange: DateRange) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');

  const monthKey = getMonthKey(year, month);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotes(parsed);
      } catch (e) {
        console.error('Failed to parse notes:', e);
      }
    }
  }, []);

  const saveNote = useCallback(() => {
    if (!currentNote.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      content: currentNote.trim(),
      monthKey,
      range: selectedRange.start && selectedRange.end ? { ...selectedRange } : undefined,
      createdAt: Date.now(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    setCurrentNote('');
  }, [currentNote, monthKey, selectedRange, notes]);

  const deleteNote = useCallback((id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  }, [notes]);

  const monthNotes = notes.filter(note => note.monthKey === monthKey);

  return {
    notes: monthNotes,
    currentNote,
    setCurrentNote,
    saveNote,
    deleteNote,
  };
};
