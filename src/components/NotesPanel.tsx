import type { DateRange } from '../utils/dateUtils';
import { formatDateRange } from '../utils/dateUtils';

interface Note {
  id: string;
  content: string;
  range?: DateRange;
  createdAt: number;
}

interface NotesPanelProps {
  notes: Note[];
  currentNote: string;
  selectedRange: DateRange;
  onNoteChange: (value: string) => void;
  onSaveNote: () => void;
  onDeleteNote: (id: string) => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  currentNote,
  selectedRange,
  onNoteChange,
  onSaveNote,
  onDeleteNote,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSaveNote();
    }
  };

  const hasSelection = selectedRange.start && selectedRange.end;

  return (
    <div className="h-full flex flex-col bg-card-bg rounded-xl p-4 border border-gray-800/30" >
      {/* Notes Header */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-text-primary mb-2 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Notes
        </h3>
        <div className="h-px bg-gradient-to-r from-primary-orange/50 via-primary-orange/20 to-transparent" />
      </div>

      {/* Note Input */}
      <div className="space-y-3 mb-4">
        <div className="relative" style={{ padding: '10px' }}>
          <textarea style={{ padding: '7px' }}
            value={currentNote}
            onChange={(e) => onNoteChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={hasSelection 
              ? "Write a note for selected dates..." 
              : "Select dates to create a note..."}
            className={`
              w-full px-3 py-2.5 text-xs
              bg-elevated-card text-text-primary placeholder-text-secondary/60
              border rounded-lg resize-none
              transition-all duration-300
              focus:outline-none focus:border-transparent
              ${hasSelection 
                ? 'border-primary-orange/50 focus:ring-1 focus:ring-primary-orange/50 glow-orange shadow-lg' 
                : 'border-gray-800/30 focus:ring-1 focus:ring-gray-700/50'
              }
            `}
            rows={3}
          />
          {hasSelection && (
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 rounded-full bg-primary-orange glow-orange animate-pulse" />
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-text-secondary/70 flex items-center gap-1">
            {hasSelection ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Ready
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                Select dates
              </>
            )}
          </p>
          <button style={{ padding: '5px' }}
            onClick={onSaveNote}
            disabled={!currentNote.trim() || !hasSelection}
            className={`
              px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300
              ${currentNote.trim() && hasSelection
                ? 'gradient-orange text-white hover:glow-orange-strong shadow-lg' 
                : 'bg-elevated-card/50 text-text-secondary/40 border border-gray-800/30 cursor-not-allowed'
              }
            `}
          >
            Save
          </button>
        </div>
      </div>

      {/* Saved Notes */}
      {notes.length > 0 ? (
        <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar" style={{padding: '10px'}}>
          <div className="text-xs text-text-secondary/60 font-semibold mb-2 uppercase tracking-wider" style={{ padding: '10px' }}>
            Saved ({notes.length})
          </div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-elevated-card/60 rounded-lg border border-gray-800/40 group hover:border-primary-orange/50 hover:bg-elevated-card transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3" style={{ padding: '10px' }}>
                <div className="flex-1 min-w-0">
                  {note.range && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-orange glow-orange" />
                      <p className="text-xs text-primary-orange font-bold uppercase tracking-wide">
                        {formatDateRange(note.range)}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-text-primary/90 leading-relaxed">{note.content}</p>
                </div>
                <button style={{ padding: '10px' }}
                  onClick={() => onDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-text-secondary/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 shrink-0"
                  aria-label="Delete note"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <svg className="w-12 h-12 text-text-secondary/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-text-secondary/60">No notes yet</p>
            <p className="text-xs text-text-secondary/40 mt-1">Select dates and create your first note</p>
          </div>
        </div>
      )}
    </div>
  );
};
