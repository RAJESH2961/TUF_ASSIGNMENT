# 🗓️ Premium Wall Calendar - React

A beautiful, interactive wall calendar application built with React, TypeScript, and Tailwind CSS. Features a premium dark UI with orange accents, realistic wall-hanging effects, and a powerful notes system.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.4-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-38bdf8)

---

## ✨ Features

### 🎨 **Premium UI/UX**
- **Dark Dashboard Theme** - Modern dark interface with orange accent colors
- **Wall Calendar Aesthetic** - Realistic spiral binding with hanging hook effect
- **Smooth Animations** - Flip animations for month transitions, glow effects, and smooth transitions
- **3D Effects** - Perspective transforms and shadows for depth
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 📅 **Calendar Features**
- **Interactive Date Selection** - Click to select single dates or ranges
- **Visual Range Indicators** - Orange gradient backgrounds for selected ranges
- **Today Highlight** - Orange ring around current date
- **Weekend Styling** - Orange tint for Saturdays and Sundays
- **Month Navigation** - Previous/Next buttons with keyboard shortcuts (⌘+←/→)
- **Flip Animation** - Smooth 3D flip when changing months

### 📝 **Notes System**
- **Range-Based Notes** - Attach notes to specific date ranges
- **Auto-Save** - Notes automatically saved to localStorage
- **Smart UI** - Context-aware input with visual feedback
- **Note Management** - View, edit, and delete saved notes
- **Persistent Storage** - Notes persist across sessions

### ⌨️ **Keyboard Navigation**
- `⌘+←` / `Ctrl+←` - Previous month
- `⌘+→` / `Ctrl+→` - Next month
- `ESC` - Clear date selection
- `⌘+Enter` - Save note (when textarea focused)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd calendar-react

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
calendar-react/
├── src/
│   ├── components/          # React components
│   │   ├── CalendarCard.tsx    # Main calendar container
│   │   ├── CalendarGrid.tsx    # Calendar grid layout
│   │   ├── DateCell.tsx        # Individual date cell
│   │   ├── HeroSection.tsx     # Hero image with month/year
│   │   ├── NotesPanel.tsx      # Notes sidebar
│   │   └── RangeSummary.tsx    # Selected range display
│   ├── hooks/               # Custom React hooks
│   │   ├── useCalendar.ts      # Calendar state management
│   │   ├── useDateRange.ts     # Date range selection
│   │   └── useNotes.ts         # Notes management
│   ├── utils/               # Utility functions
│   │   └── dateUtils.ts        # Date manipulation helpers
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles & Tailwind
├── public/                  # Static assets
├── package.json             # Dependencies
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── postcss.config.js       # PostCSS configuration
```

---

## 🎨 Design System

### Color Palette

```css
/* Orange Accent Colors */
--primary-orange: #F97316      /* Main accent */
--deep-orange: #EA580C         /* Gradient end */
--glow-orange: #FB923C         /* Highlights */

/* Dark Backgrounds */
--dark-bg: #0B0F19            /* Base background */
--card-bg: #111827            /* Card background */
--elevated-card: #1F2937      /* Raised elements */

/* Text Colors */
--text-primary: #F9FAFB       /* Primary text */
--text-secondary: #9CA3AF     /* Secondary text */
```

### Typography
- **Font Family**: Inter (weights 300-800)
- **Sizes**: xs (0.75rem) to 4xl (2.25rem)

### Spacing
- Compact design with efficient use of space
- Consistent padding and margins
- Responsive gaps and spacing

---

## 🧩 Component Architecture

### **CalendarCard** (Main Container)
- Manages overall layout
- Coordinates child components
- Handles keyboard navigation
- Implements wall-hanging effect with spiral binding

### **HeroSection** (Header)
- Displays month and year
- Background image with dark overlay
- Orange gradient accent
- Responsive text sizing

### **CalendarGrid** (Calendar Layout)
- 7-column grid for weekdays
- Generates calendar days
- Handles date cell rendering

### **DateCell** (Individual Date)
- Interactive date selection
- Visual states (today, selected, range, weekend)
- Hover effects and animations
- Orange glow for selections

### **NotesPanel** (Sidebar)
- Note input with context awareness
- Saved notes list
- Delete functionality
- Empty state handling

### **RangeSummary** (Range Display)
- Shows selected date range
- Clear button
- Smart empty state

---

## 🔧 Custom Hooks

### `useCalendar()`
Manages calendar state and navigation.

```typescript
const { year, month, goToNextMonth, goToPreviousMonth } = useCalendar();
```

**Returns:**
- `year` - Current year
- `month` - Current month (0-11)
- `goToNextMonth()` - Navigate to next month
- `goToPreviousMonth()` - Navigate to previous month

### `useDateRange()`
Handles date range selection.

```typescript
const { range, isSelecting, handleDateClick, clearSelection } = useDateRange();
```

**Returns:**
- `range` - Selected date range `{ start: Date | null, end: Date | null }`
- `isSelecting` - Boolean indicating if user is selecting
- `handleDateClick(date)` - Handle date click
- `clearSelection()` - Clear current selection

### `useNotes(year, month, selectedRange)`
Manages notes with localStorage persistence.

```typescript
const { notes, currentNote, setCurrentNote, saveNote, deleteNote } = useNotes(year, month, range);
```

**Returns:**
- `notes` - Array of notes for current month
- `currentNote` - Current note text
- `setCurrentNote(text)` - Update current note
- `saveNote()` - Save note to localStorage
- `deleteNote(id)` - Delete note by ID

---

## 🎯 Key Features Explained

### **Wall Calendar Effect**
The calendar uses CSS transforms and shadows to create a realistic wall-hanging appearance:
- Spiral binding with 20 metal rings
- Hanging hook at the top
- Perspective transforms for 3D depth
- Gentle sway on hover

### **Date Range Selection**
Click dates to select ranges:
1. First click sets start date (solid orange circle)
2. Second click sets end date (solid orange circle)
3. Dates between show gradient background
4. Click again to start new selection

### **Notes System**
Notes are tied to date ranges:
- Select dates first
- Input glows orange when ready
- Notes saved to localStorage
- Organized by month
- Persistent across sessions

### **Flip Animation**
Month transitions use 3D flip:
- Smooth rotateY animation
- 600ms duration
- Triggered by month change
- Key-based re-rendering

---

## 🎨 CSS Features

### Custom Classes
```css
.wall-attached          /* Wall-hanging effect */
.spiral-binding         /* Spiral binding bar */
.spiral-rings           /* Ring container */
.spiral-ring            /* Individual metal ring */
.hanging-hook           /* Hook at top */
.flip-enter             /* Flip in animation */
.glow-orange            /* Orange glow effect */
.gradient-orange        /* Orange gradient */
.custom-scrollbar       /* Styled scrollbar */
```

### Animations
- **Flip**: 3D rotation for month changes
- **Glow**: Pulsing glow on selections
- **Hover**: Smooth color and transform transitions
- **Sway**: Gentle rotation on calendar hover

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Side-by-side layout (notes left, calendar right)
- Larger text and spacing
- Full spiral binding visible

### Tablet (768px - 1024px)
- Adjusted spacing
- Medium text sizes
- Optimized touch targets

### Mobile (< 768px)
- Stacked vertical layout
- Compact spacing
- Larger tap targets (min 44px)
- Simplified animations

---

## 🔒 Data Persistence

Notes are stored in `localStorage`:
```typescript
{
  id: string;              // Unique ID (timestamp)
  content: string;         // Note text
  monthKey: string;        // "YYYY-MM" format
  range?: {                // Optional date range
    start: Date | null;
    end: Date | null;
  };
  createdAt: number;       // Timestamp
}
```

**Storage Key**: `calendar-notes`

---

## 🛠️ Technologies Used

### Core
- **React 19.2.4** - UI library
- **TypeScript 6.0.2** - Type safety
- **Vite 8.0.4** - Build tool

### Styling
- **Tailwind CSS 4.2.2** - Utility-first CSS
- **PostCSS** - CSS processing
- **Custom CSS** - Advanced animations and effects

### Development
- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting
- **Vite Plugin React** - Fast refresh

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

---

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Requires modern browser with CSS Grid, Flexbox, and CSS Custom Properties support.

---

## 🚧 Future Enhancements

- [ ] Export notes to PDF/JSON
- [ ] Import/Export functionality
- [ ] Multiple calendar views (week, day)
- [ ] Recurring events
- [ ] Color-coded categories
- [ ] Search and filter notes
- [ ] Dark/Light theme toggle
- [ ] Custom color schemes
- [ ] Print-friendly view
- [ ] Accessibility improvements (ARIA labels)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for TakeUforward Internship Assignment

---

## 🙏 Acknowledgments

- **Unsplash** - Hero images
- **Tailwind CSS** - Styling framework
- **React Team** - Amazing library
- **Vite** - Lightning-fast build tool

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---

**Enjoy your premium wall calendar! 🗓️✨**
