# 🎮 Pokemon Browser

A modern, responsive Pokemon browser built with React, TypeScript, and Vite. Features both pagination and "Load More" viewing modes with a comprehensive Pokemon detail page.

## ✨ Features

### 🎯 Core Features
- **Dual View Modes**: Toggle between pagination and "Load More" button
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark Mode Support**: Automatic dark mode detection and styling
- **Comprehensive Detail Page**: Rich Pokemon information display

### 📱 Mobile Optimized
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Mobile Pagination**: Responsive pagination controls
- **Optimized Layout**: Grid adapts from 1 column on mobile to 5 columns on desktop
- **Mobile Scrolling**: Internal card scrolling on mobile devices
- **Compact Design**: Ultra-compact spacing on small screens

### 🎨 UI/UX Features
- **Animated Buttons**: Smooth transitions and hover effects
- **Loading States**: Skeleton loaders, loading spinners, and image skeletons
- **Error Handling**: Graceful error boundaries and retry mechanisms
- **Type Badges**: Color-coded Pokemon type indicators
- **Clean Design**: Modern, minimalist interface with proper spacing
- **Background Animation**: Smooth color transitions between view modes
- **Responsive Typography**: Text scales appropriately across devices
- **Viewport Optimization**: Cards fit content naturally on larger screens

## 🚀 Live Demo

**Production URL:** https://pokedex-nine-eta-55.vercel.app/

## 📂 Repository

**GitHub Repository:** https://github.com/AhmedAyman-96/Pokedex

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
│   │   ├── PokemonCard.tsx # Individual Pokemon card with image skeleton
│   │   ├── PokemonCardSkeleton.tsx # Loading skeleton for cards
│   │   ├── TypeBadge.tsx   # Pokemon type badge
│   │   ├── ViewModeToggle.tsx # View mode selector with animations
│   │   ├── PaginationControls.tsx # Pagination component
│   │   ├── ErrorDisplay.tsx # Reusable error component
│   │   ├── LoadingSpinner.tsx # Reusable loading component
│   │   ├── LoadingMoreIndicator.tsx # "Loading more Pokemon" indicator
│   │   ├── ImageSkeleton.tsx # Skeleton loader for images
│   │   ├── LoadMorePokemonGrid.tsx # Grid with "Load More" button
│   │   ├── LazyPokemonGrid.tsx # Lazy loading grid component
│   │   ├── PokemonDetailHeader.tsx # Detail page header
│   │   ├── PokemonDetailImage.tsx # Pokemon image with error handling
│   │   ├── PokemonDetailInfo.tsx # Height/weight information
│   │   ├── StatsSection.tsx # Pokemon stats display
│   │   ├── AbilitiesSection.tsx # Pokemon abilities display
│   │   ├── SuspenseErrorBoundary.tsx # Combined Suspense and error handling
│   │   ├── ErrorBoundary.tsx # Error boundary component
│   │   └── index.ts # Centralized component exports
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
│   │   └── PokemonDetail.tsx # Pokemon detail page with responsive design
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
// Organized component structure with clear responsibilities
<PokemonList>
  <ViewModeToggle />
  <LoadMorePokemonGrid />
  <PaginationControls />
</PokemonList>

<PokemonDetail>
  <PokemonDetailHeader />
  <PokemonDetailImage />
  <PokemonDetailInfo />
  <StatsSection />
  <AbilitiesSection />
</PokemonDetail>
```

#### **3. Custom Hooks for State Management**
```typescript
// usePokemonListState.ts - Manages all Pokemon list logic
const {
  // State
  viewType,
  currentPage,
  
  // Data
  filteredPokemonList,
  currentLoading,
  currentNextPageLoading,
  currentError,
  currentHasMore,
  totalPages,
  limit,
  
  // Actions
  handleRetry,
  handlePokemonClick,
  handlePageChange,
  handleViewTypeChange,
  loadMore,
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

### **📦 Modular Components**

#### **UI Components**
- `ErrorDisplay`: Consistent error handling across the app
- `LoadingSpinner`: Standardized loading states
- `LoadingMoreIndicator`: Transparent loading indicator for "Load More"
- `ImageSkeleton`: Skeleton loader for Pokemon images
- `PokemonCardSkeleton`: Loading skeleton for Pokemon cards

#### **Layout Components**
- `LoadMorePokemonGrid`: Grid with "Load More" button functionality
- `LazyPokemonGrid`: Lazy loading grid component
- `PaginationControls`: Reusable pagination component
- `ViewModeToggle`: Encapsulated view mode logic with animations

#### **Pokemon Detail Components**
- `PokemonDetailHeader`: Header section with gradient background
- `PokemonDetailImage`: Image display with error handling and skeleton
- `PokemonDetailInfo`: Height/weight information display
- `StatsSection`: Pokemon stats with progress bars
- `AbilitiesSection`: Pokemon abilities with hidden ability indicators
- `TypeBadge`: Color-coded Pokemon type badges

#### **Suspense Components**
- `SuspenseErrorBoundary`: Combined Suspense and error handling with retry functionality
- `ErrorBoundary`: Standalone error boundary component

#### **Custom Hooks**
- `usePokemonListState`: Manages Pokemon list state and logic
- `usePokemonDetailState`: Manages Pokemon detail state
- `useTypeColors`: Provides type color utilities
- `useInfinitePokemon`: Data fetching hooks for infinite scroll

### **🔧 Configuration Management**

#### **Constants File**
```typescript
// src/lib/constants.ts
export const ITEMS_PER_PAGE = 20;
export const TYPE_COLORS = {
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400'
};
export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch Pokémon data',
  NOT_FOUND: 'Pokémon not found',
  NETWORK_ERROR: 'Network error occurred',
  UNKNOWN_ERROR: 'An unexpected error occurred'
};
```

### **⚡ API Optimization**

#### **Efficient Data Fetching**
The app uses an optimized approach for fetching Pokemon data:

```typescript
// URL-based fetching from list response
const pokemonUrls = pokemonList.results.map(pokemon => pokemon.url);
const detailedPokemon = await fetchPokemonDetailsByUrls(pokemonUrls);
```

**Benefits:**
- **Parallel Requests**: All requests happen simultaneously
- **Correct URLs**: Uses the actual URLs provided by the API
- **Better Error Handling**: Individual Pokemon failures don't break the entire page
- **Caching**: React Query can cache individual Pokemon by URL

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedAyman-96/Pokedex.git
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
- **Load More**: Button-based loading for additional Pokemon

### Navigation
- **Pokemon Cards**: Click any Pokemon card to view details
- **Back Button**: Use the back button to return to the list
- **Responsive Design**: Optimized layout for all screen sizes

### Pokemon Detail Page
- **Comprehensive Information**: Stats, abilities, types, and physical attributes
- **Responsive Layout**: Adapts from mobile to desktop
- **Mobile Scrolling**: Internal card scrolling on small screens
- **Natural Height**: Fits content on larger screens

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

#### LoadMorePokemonGrid
Handles "Load More" functionality with loading states:
```typescript
interface LoadMorePokemonGridProps {
  pokemonList: Pokemon[];
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  loadNextPage: () => void;
  onPokemonClick: (pokemon: Pokemon) => void;
}
```

#### PokemonDetail
Responsive detail page with mobile optimization:
```typescript
// Mobile: Internal scrolling with height constraints
// Desktop: Natural content fit without scrolling
<div className="max-h-[calc(100vh-6rem)] sm:max-h-fit">
  <div className="overflow-y-auto sm:overflow-visible">
    {/* Content */}
  </div>
</div>
```

#### useInfinitePokemon Hook
Manages "Load More" data fetching:
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
  // Add more types as needed
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
- **Image Optimization**: Skeleton loaders and error handling for images
- **Responsive Design**: Optimized layouts for all screen sizes

### Mobile Optimizations
- **Compact Spacing**: Ultra-compact design on small screens
- **Touch-Friendly**: Large touch targets and smooth interactions
- **Internal Scrolling**: Card content scrolls on mobile only
- **Progressive Enhancement**: Scales up appropriately on larger screens

### Desktop Optimizations
- **Natural Height**: Cards fit content without artificial constraints
- **Generous Spacing**: Appropriate spacing for larger screens
- **No Scrolling**: Content fits naturally without overflow
- **Responsive Typography**: Text scales appropriately

## 🎯 Recent Updates

### **Component Organization**
- Added section comments for better code organization
- Centralized component exports in `src/components/index.ts`
- Organized components by category (UI, Layout, Pokemon Detail, Suspense)

### **Responsive Design Improvements**
- Mobile-first approach with ultra-compact spacing
- Progressive enhancement for larger screens
- Viewport-optimized layouts
- Responsive typography and spacing

### **Loading States**
- Image skeleton loaders for Pokemon sprites
- Loading more indicators with transparent backgrounds
- Comprehensive error handling
- Smooth loading transitions


---

**Built with ❤️ using React, TypeScript, and Vite**
