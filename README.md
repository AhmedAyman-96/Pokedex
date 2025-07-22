# Pokémon Browser

A responsive Pokémon browser built with React, TypeScript, Vite, and Tailwind CSS. This application allows users to browse Pokémon with two different viewing modes: pagination and infinite scroll (load more).

## Features

- **Two View Modes:**
  - **Pagination View:** Navigate through Pokémon with Previous/Next buttons
  - **Load More View:** Continuously load more Pokémon with a "Load More" button

- **Pokémon Detail Page:** 
  - Displays comprehensive information about each Pokémon
  - Shows name, sprite, height, weight, and types
  - Responsive design for all screen sizes

- **Responsive Design:**
  - Fully responsive across desktop, tablet, and mobile devices
  - Adaptive grid layouts that work on all screen sizes
  - Dark mode support

- **Loading & Error States:**
  - Loading spinners and skeleton states
  - Error handling with retry functionality
  - Graceful fallbacks for missing images

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **PokéAPI** for data fetching

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-browser
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── PokemonCard.tsx  # Individual Pokémon card component
├── hooks/              # Custom React hooks
│   └── usePokemon.ts   # Pokémon data fetching hooks
├── pages/              # Page components
│   ├── PokemonList.tsx # Main list page with both view modes
│   └── PokemonDetail.tsx # Individual Pokémon detail page
├── types/              # TypeScript type definitions
│   └── pokemon.ts      # Pokémon data interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind
```

## API Integration

The application uses the public [PokéAPI](https://pokeapi.co/) to fetch Pokémon data:

- **List Endpoint:** `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`
- **Detail Endpoint:** `GET https://pokeapi.co/api/v2/pokemon/{id}`

## Features in Detail

### Pagination View
- Shows 20 Pokémon per page
- Previous/Next navigation buttons
- Current page indicator
- Disabled states for navigation when at limits

### Load More View
- Initially loads 20 Pokémon
- "Load More" button to append additional Pokémon
- Maintains all previously loaded Pokémon in state
- Loading indicator while fetching more data

### Detail Page
- Displays official artwork when available
- Shows Pokémon ID with proper formatting
- Type badges with appropriate styling
- Height and weight in proper units (meters/kilograms)
- Back navigation to return to the list

### Responsive Design
- Mobile-first approach
- Grid adapts from 1 column (mobile) to 5 columns (desktop)
- Touch-friendly interface
- Optimized for all screen sizes

## Deployment

The application can be deployed to any static hosting service:

- **Vercel:** Connect your GitHub repository for automatic deployments
- **Netlify:** Drag and drop the `dist` folder or connect your repository
- **GitHub Pages:** Use GitHub Actions for automatic deployment

## Future Enhancements

Potential improvements that could be added:

- [ ] Search functionality
- [ ] Filtering by type
- [ ] Favorites system
- [ ] Advanced stats display
- [ ] Evolution chains
- [ ] Move lists
- [ ] Abilities information

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
