# Workiom Automation Executions Dashboard

A comprehensive, enterprise-grade analytics dashboard for tracking and analyzing automation execution quotas in Workiom.

## Features

### 📊 Summary Card View
- **Dual Quota Tracking**: Monitor both daily (10K) and monthly (100K) execution limits
- **Progress Visualization**: Color-coded progress bars with smart thresholds
- **Status Breakdown**: Real-time overview of Success/Failed/Warning executions
- **Expandable Details**: One-click access to comprehensive analytics

### 📈 Historical Trends Analysis
- **Interactive Area Chart**: Visualize execution patterns over time
- **Stacked Status View**: See success, failure, and warning trends
- **Flexible Time Ranges**: View last 7, 14, or 30 days
- **Rich Tooltips**: Detailed information on hover

### 🎯 Quota Distribution Analytics
- **By Application**: Horizontal bar chart showing top quota consumers (Workiom, Salesforce, HubSpot, etc.)
- **By List/Database**: Top 10 most active workflows
- **By Status**: Donut chart with success rate and status breakdown
- **Color-coded Insights**: Immediate visual identification of patterns

### 🔍 Advanced Data Table
- **1,000 Sample Records**: Pre-generated realistic automation data
- **Multi-Column Sorting**: Click any column header to sort
- **Powerful Filtering**:
  - Global search across all fields
  - Multi-select for Applications and Lists
  - Status filter (Success/Failed/Warning)
  - Date range picker with custom ranges
  - Real-time filter count badge
- **Pagination**: 100 records per page with navigation controls
- **Excel Export**: One-click export with date range in filename

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui patterns
- **Charts**: Recharts (Area, Bar, Pie charts)
- **Data Table**: TanStack Table v8
- **Date Handling**: date-fns
- **Excel Export**: xlsx

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with global styles
│   ├── page.tsx            # Main page with subscription UI
│   └── globals.css         # Global CSS with Tailwind
├── components/
│   ├── automation-executions-dashboard.tsx  # Main dashboard component
│   ├── summary-card.tsx                     # Quota metrics summary
│   ├── executions-table.tsx                 # Advanced data table
│   ├── charts/
│   │   ├── historical-trends-chart.tsx      # Area chart for trends
│   │   ├── app-distribution-chart.tsx       # Horizontal bar chart
│   │   ├── list-distribution-chart.tsx      # Vertical bar chart
│   │   └── status-distribution-chart.tsx    # Donut chart
│   └── ui/                                  # Base UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       └── select.tsx
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── data-generator.ts   # Sample data generator (1,000 records)
│   ├── analytics.ts        # Analytics calculation functions
│   └── utils.ts            # Utility functions
└── package.json
```

## Data Model

### Automation Execution Columns
1. **Automation ID**: Format `AUTO-0001` to `AUTO-1000`
2. **Automation Name**: 15 different automation types
3. **Automation App Name**: 10 apps (Workiom, Salesforce, HubSpot, etc.)
4. **Automation List Name**: 10 lists (Customer Database, Sales Pipeline, etc.)
5. **Automation Execution Date and Time**: Last 30 days, random distribution
6. **Automation Status**: Success (75%), Failed (15%), Success with Warning (10%)

## Key Features Implementation

### Visualization Strategy
- **Area Chart**: Best for showing temporal trends and patterns
- **Horizontal Bar Chart**: Optimal for comparing apps with longer labels
- **Vertical Bar Chart**: Effective for top lists comparison
- **Donut Chart**: Clear status distribution with center total

### User Experience
- **Progressive Disclosure**: Start with summary, expand for details
- **Color Coding**: Green (success), Red (failed), Yellow (warning)
- **Responsive Design**: Adapts to desktop, tablet, and mobile
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation

### Performance
- **Client-side Filtering**: Instant response for 1K records
- **Memoization**: Optimized calculations with React useMemo
- **Lazy Loading**: Detailed views load only when expanded

## Integration Guide

This dashboard is designed as a standalone component that can be integrated into any Workiom page:

```tsx
import AutomationExecutionsDashboard from "@/components/automation-executions-dashboard";

export default function YourPage() {
  return (
    <div>
      {/* Your existing content */}
      <AutomationExecutionsDashboard />
    </div>
  );
}
```

## Customization

### Quota Limits
Edit in `lib/analytics.ts`:
```typescript
const DAILY_LIMIT = 10000;
const MONTHLY_LIMIT = 100000;
```

### Data Source
Replace the sample data generator in `lib/data-generator.ts` with your actual API:
```typescript
export async function getAutomationData() {
  const response = await fetch('/api/automation-executions');
  return response.json();
}
```

### Styling
The dashboard uses Tailwind CSS and follows Workiom's design language. Customize colors in `tailwind.config.ts`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - Workiom Dashboard

## Support

For questions or issues, please contact the Workiom development team.

---

Built with ❤️ for Workiom
