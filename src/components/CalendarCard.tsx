import { useEffect, useCallback } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { useDateRange } from '../hooks/useDateRange';
import { useNotes } from '../hooks/useNotes';
import { HeroSection } from './HeroSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { RangeSummary } from './RangeSummary';

export const CalendarCard: React.FC = () => {
  const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();
  const { range, isSelecting, handleDateClick, clearSelection } = useDateRange();
  const { notes, currentNote, setCurrentNote, saveNote, deleteNote } = useNotes(year, month, range);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      goToPreviousMonth();
    } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      goToNextMonth();
    } else if (e.key === 'Escape') {
      clearSelection();
    }
  }, [goToPreviousMonth, goToNextMonth, clearSelection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 pt-12">
      {/* Hanging Hook */}
      <div className="hanging-hook" />
      
      {/* Animated Border Wrapper */}
      <div className="p-[2px] rounded-xl animated-border wall-attached spiral-binding">
        {/* Spiral Rings */}
        <div className="spiral-rings">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="spiral-ring" />
          ))}
        </div>
        
        {/* Main Card - Dark Dashboard Style */}
        <div className="bg-card-bg rounded-xl overflow-hidden transition-all duration-500">
          {/* Hero Image Section */}
          <HeroSection month={month} year={year} />

          {/* Main Content Area */}
          <div className="p-4 md:p-6">
            {/* Navigation Controls - Smaller & Subtle */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPreviousMonth}
                className="p-2 rounded-lg bg-elevated-card/50 hover:bg-gray-700 border border-gray-800/50 hover:border-primary-orange/50 text-text-secondary hover:text-primary-orange transition-smooth text-xs"
                aria-label="Previous month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-center" style={{ padding: '10px' }}>
                <p className="text-xs text-text-secondary/70">
                  <span className="text-primary-orange/80">⌘+←</span> / <span className="text-primary-orange/80">⌘+→</span>
                </p>
              </div>
              
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-lg bg-elevated-card/50 hover:bg-gray-700 border border-gray-800/50 hover:border-primary-orange/50 text-text-secondary hover:text-primary-orange transition-smooth text-xs"
                aria-label="Next month"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Notes Panel - Left Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <div className="sticky top-6">
                  <NotesPanel
                    notes={notes}
                    currentNote={currentNote}
                    selectedRange={range}
                    onNoteChange={setCurrentNote}
                    onSaveNote={saveNote}
                    onDeleteNote={deleteNote}
                  />
                </div>
              </div>

              {/* Calendar Section - Right Main Area */}
              <div className="lg:col-span-2 order-1 lg:order-2 space-y-4 flip-enter" key={`${year}-${month}`}>
                {/* Range Summary */}
                <RangeSummary range={range} onClear={clearSelection} />
                
                {/* Calendar Grid */}
                <div className="p-4 bg-elevated-card rounded-xl border border-gray-800/50 hover:border-gray-700 transition-smooth">
                  <CalendarGrid
                    year={year}
                    month={month}
                    range={range}
                    isSelecting={isSelecting}
                    onDateClick={handleDateClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
