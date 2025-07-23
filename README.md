# 🎮 Pokemon Browser

A modern, responsive Pokemon browser built with React, TypeScript, and Vite. Features both pagination and infinite scroll viewing modes.

## ✨ Features

### 🎯 Core Features
- **Dual View Modes**: Toggle between pagination and infinite scroll
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode Support**: Automatic dark mode detection and styling

### 📱 Mobile Optimized
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Mobile Pagination**: Responsive pagination controls that don't require horizontal scrolling
- **Optimized Layout**: Grid adapts from 1 column on mobile to 5 columns on desktop
- **Smooth Scrolling**: Container-based infinite scroll detection

### 🎨 UI/UX Features
- **Animated Buttons**: Smooth transitions and hover effects
- **Loading States**: Skeleton loaders and loading spinners
- **Error Handling**: Graceful error boundaries and retry mechanisms
- **Type Badges**: Color-coded Pokemon type indicators
- **Clean Design**: Modern, minimalist interface with proper spacing
- **Background Animation**: Smooth color transitions between view modes
- **Suspense Integration**: Lazy loading and code splitting with Suspense boundaries

## 🚀 Live Demo

**Production URL:** https://pokedex-bo4mivjl5-ahmedayman-96s-projects.vercel.app

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Icons**: Custom SVG components
- **Deployment**: Vercel

## 🏗️ Modular & Testable Architecture

### **📁 Project Structure**
```
pokemon-browser/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── icons/          # SVG icon components
│   │   ├── PokemonCard.tsx # Individual Pokemon card
│   │   ├── TypeBadge.tsx   # Pokemon type badge
│   │   ├── ViewModeToggle.tsx # View mode selector
│   │   ├── PaginationControls.tsx # Pagination component
│   │   ├── ErrorDisplay.tsx # Reusable error component
│   │   ├── LoadingSpinner.tsx # Reusable loading component
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── usePokemon.ts   # Pokemon data fetching
│   │   ├── useInfinitePokemon.ts # Infinite scroll logic
│   │   ├── useTypeColors.ts # Type color management
│   │   ├── usePokemonListState.ts # Pokemon list state management
│   │   └── usePokemonDetailState.ts # Pokemon detail state management
│   ├── lib/                # Utility functions and constants
│   │   ├── api.ts          # API layer for data fetching
│   │   ├── utils.ts        # Pure utility functions
│   │   └── constants.ts    # Application constants
│   ├── pages/              # Page components
│   │   ├── PokemonList.tsx # Main Pokemon list page
│   │   └── PokemonDetail.tsx # Pokemon detail page
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main app component
├── public/                 # Static assets
├── vercel.json            # Vercel deployment config
├── vite.config.ts         # Vite build configuration
└── package.json           # Dependencies and scripts
```

### **🔧 Architecture Principles**

#### **1. Separation of Concerns**
- **API Layer** (`src/lib/api.ts`): All data fetching logic
- **Business Logic** (`src/lib/utils.ts`): Pure functions for data manipulation
- **State Management** (`src/hooks/`): Custom hooks for component state
- **UI Components** (`src/components/`): Reusable, focused components
- **Constants** (`src/lib/constants.ts`): Centralized configuration

#### **2. Component Modularity**
```typescript
// Before: Large monolithic component (328 lines)
// After: Small, focused components
<PokemonList>
  <ViewModeToggle />
  <SearchBar />
  <TypeFilter />
  <PokemonGrid />
  <PaginationControls />
</PokemonList>
```

#### **3. Custom Hooks for State Management**
```typescript
// usePokemonListState.ts - Manages all Pokemon list logic
const {
  filteredPokemonList,
  currentLoading,
  handleRetry,
  handlePokemonClick,
  handlePageChange,
  // ... more state and actions
} = usePokemonListState();
```

#### **4. Pure Utility Functions**
```typescript
// src/lib/utils.ts - Easy to test pure functions
export function filterPokemon(
  pokemonList: Pokemon[],
  searchTerm: string,
  selectedTypes: string[]
): Pokemon[] {
  return pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 ||
      pokemon.types.some(type => selectedTypes.includes(type.type.name));
    return matchesSearch && matchesType;
  });
}

// Extract URLs from the list response for detailed fetching
const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url);
```

### **🧪 Testability Features**

#### **1. Pure Functions**
- All utility functions are pure and easily testable
- No side effects or dependencies on external state
- Clear input/output contracts

#### **2. Separated Business Logic**
- Business logic extracted from UI components
- Custom hooks encapsulate complex state management
- API layer isolated for easy mocking

#### **3. Component Isolation**
- Components receive props and callbacks
- No direct API calls in components
- Easy to test individual components

#### **4. Type Safety**
- Full TypeScript coverage
- Clear interfaces for all components
- Compile-time error detection

#### **5. Suspense Integration**
- Lazy loading for code splitting
- Suspense boundaries for loading states
- Error boundaries for error handling
- Granular component-level Suspense

### **📦 Modular Components**

#### **Reusable UI Components**
- `ErrorDisplay`: Consistent error handling across the app
- `LoadingSpinner`: Standardized loading states
- `ViewModeToggle`: Encapsulated view mode logic
- `PaginationControls`: Reusable pagination component
- `SuspenseWrapper`: Reusable Suspense boundaries
- `SuspenseErrorBoundary`: Combined Suspense and error handling

#### **Specialized Components**
- `PokemonDetailHeader`: Header section for detail page
- `PokemonDetailImage`: Image display with error handling
- `PokemonDetailInfo`: Height/weight information display

#### **Custom Hooks**
- `usePokemonListState`: Manages Pokemon list state and logic
- `usePokemonDetailState`: Manages Pokemon detail state
- `useTypeColors`: Provides type color utilities
- `useSuspensePokemon`: Data fetching hooks for Suspense integration

### **🔧 Configuration Management**

#### **Constants File**
```typescript
// src/lib/constants.ts
export const ITEMS_PER_PAGE = 20;
export const SCROLL_THRESHOLD = 100;
export const TYPE_COLORS = { /* ... */ };
export const ERROR_MESSAGES = { /* ... */ };
```

### **⚡ API Optimization**

#### **Efficient Data Fetching**
The app uses an optimized approach for fetching Pokemon data:

```typescript
// Before: Inefficient - 20 separate API calls using URLs
const pokemonList = await fetchPokemonList(20, 0);
const detailedPokemon = await fetchPokemonDetails(pokemonList); // 20 API calls

// After: Efficient - URL-based fetching from list response
const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url); // Extract URLs from response
const detailedPokemon = await fetchPokemonDetailsByUrls(pokemonUrls); // 20 parallel API calls
```

**Benefits:**
- **Parallel Requests**: All 20 requests happen simultaneously instead of sequentially
- **Correct URLs**: Uses the actual URLs provided by the API, avoiding non-existent Pokémon
- **Better Error Handling**: Individual Pokemon failures don't break the entire page
- **Caching**: React Query can cache individual Pokemon by URL

#### **Benefits**
- **Single Source of Truth**: All configuration in one place
- **Easy Maintenance**: Change values without touching components
- **Type Safety**: Constants are typed and validated
- **Environment Specific**: Easy to add environment-specific values

### **🚀 Performance Optimizations**

#### **Code Splitting**
- Components are naturally split by feature
- Lazy loading ready for future implementation
- Bundle size optimized through modular structure

#### **Memoization Ready**
- Components structured for easy React.memo implementation
- Pure functions ready for useMemo optimization
- State management optimized for minimal re-renders

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pokemon-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    }
  }
})
```

### Vercel Configuration (`vercel.json`)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🎮 Usage

### View Modes
- **Page Controls**: Traditional pagination with numbered pages
- **Infinite Scroll**: Continuous loading as you scroll down

### Navigation
- **Pokemon Cards**: Click any Pokemon card to view details
- **Back Button**: Use the back button to return to the list
- **Breadcrumbs**: Clear navigation between list and detail views

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Key Components

#### VirtualizedPokemonGrid
Handles infinite scroll with container-based scroll detection:
```typescript
interface VirtualizedPokemonGridProps {
  pokemonList: Pokemon[];
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  loadNextPage: () => void;
  onPokemonClick: (pokemon: Pokemon) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}
```

#### useInfinitePokemon Hook
Manages infinite scroll data fetching:
```typescript
const {
  pokemonList,
  loading,
  error,
  hasMore,
  loadMore,
  reset
} = useInfinitePokemon();
```

## 🚀 Deployment

### Vercel Deployment
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login --github
   ```

3. **Deploy**
   ```bash
   vercel
   ```

### Build Optimization
- **Code Splitting**: Automatic chunk splitting for vendor, router, and query libraries
- **Asset Optimization**: Compressed and cached static assets
- **Tree Shaking**: Unused code elimination
- **Minification**: Terser-based code minification

## 🎨 Customization

### Type Colors
Modify Pokemon type colors in `src/lib/constants.ts`:
```typescript
export const TYPE_COLORS = {
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  // ... add more types
};
```

### Styling
The app uses Tailwind CSS for styling. Customize the design by modifying:
- `tailwind.config.js` for theme customization
- Component classes for specific styling
- CSS variables for color schemes

## 🔍 Performance

### Optimizations
- **Lazy Loading**: Components load only when needed
- **Memoization**: React.memo and useMemo for performance
- **Caching**: React Query provides intelligent caching
- **Bundle Splitting**: Separate chunks for better loading

### Suspense Implementation

#### **Page-Level Suspense**
```typescript
// App.tsx - Lazy loading pages
const PokemonList = lazy(() => import('./pages/PokemonList'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail'));

<Suspense fallback={<PageLoadingFallback />}>
  <Routes>
    <Route path="/" element={<PokemonList />} />
    <Route path="/pokemon/:id" element={<PokemonDetail />} />
  </Routes>
</Suspense>
```

#### **Component-Level Suspense**
```typescript
// LazyPokemonGrid.tsx - Individual card loading
const PokemonCard = lazy(() => import('./PokemonCard'));

{pokemonList.map((pokemon) => (
  <Suspense key={pokemon.id} fallback={<CardSkeleton />}>
    <PokemonCard pokemon={pokemon} onClick={handleClick} />
  </Suspense>
))}
```

#### **Suspense with Error Boundaries**
```typescript
// SuspenseErrorBoundary.tsx - Combined loading and error handling
<SuspenseErrorBoundary 
  message="Loading Pokémon..." 
  size="lg"
>
  <PokemonDetail />
</SuspenseErrorBoundary>
```

#### **Benefits**
- **Code Splitting**: Automatic bundle splitting for better performance
- **Progressive Loading**: Components load as needed
- **Better UX**: Consistent loading states across the app
- **Error Recovery**: Graceful error handling with retry functionality
- **Performance**: Reduced initial bundle size and faster page loads



## 🐛 Troubleshooting

### Common Issues
1. **Build Errors**: Ensure all dependencies are installed
2. **Scroll Issues**: Check if scroll container ref is properly set
3. **API Errors**: Verify PokeAPI is accessible
4. **Type Errors**: Run `npm run type-check` to identify issues

### Debug Mode
Enable debug logging by adding console.logs in development:
```typescript
// In VirtualizedPokemonGrid.tsx
console.log('Scroll position:', { scrollTop, scrollHeight, clientHeight });
```

---

**Built with ❤️ using React, TypeScript, and Vite**
