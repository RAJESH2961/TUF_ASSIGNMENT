import type { DateRange } from '../utils/dateUtils';
import { formatDateRange } from '../utils/dateUtils';

interface RangeSummaryProps {
  range: DateRange;
  onClear: () => void;
}

export const RangeSummary: React.FC<RangeSummaryProps> = ({ range, onClear }) => {
  if (!range.start || !range.end) {
    return (
      <div className="p-10 rounded-lg bg-elevated-card/50 border border-gray-800/50 text-center">
        <p className="text-text-secondary text-xs m-5" style={{ padding: '20px' }}>
          Select dates to create a note
        </p>
      </div>
    );
  }

  return (
    <div className="p-9 rounded-lg glass-effect glow-orange transition-smooth">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md gradient-orange glow-orange">
            <svg className="w-5.5 h-7.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-primary-orange font-bold text-glow">
              {formatDateRange(range)}
            </p>
          </div>
        </div>
        <button style={{ padding: '10px' }}
          onClick={onClear}
          className="px-2 py-1 text-xs rounded-md bg-elevated-card/50 hover:bg-gray-700 text-text-secondary hover:text-white border border-gray-800/50 hover:border-primary-orange/50 transition-smooth"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
