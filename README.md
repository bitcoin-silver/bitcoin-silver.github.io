# Bitcoin Silver Blockchain Landing Page

Modern landing page for Bitcoin Silver Blockchain built with Vite, React, TypeScript, and Shadcn UI.

## Features

- ⚡ **Vite** - Lightning-fast development and build
- ⚛️ **React 18** - Modern React with hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Smooth animations
- 🎯 **TypeScript** - Type-safe code
- 🎪 **Shadcn UI** - Beautiful, accessible components
- 📊 **Live Blockchain Data** - Real-time stats from the Bitcoin Silver blockchain
- 🎬 **POW Animations** - Custom animations representing Proof-of-Work mining

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Header.tsx       # Navigation header
│   ├── HeroSection.tsx  # Hero section with POW animation
│   ├── StatsSection.tsx # Live blockchain statistics
│   ├── FeaturesSection.tsx # Features grid
│   ├── RoadmapSection.tsx  # Development roadmap
│   ├── Footer.tsx       # Footer with social links
│   └── POWAnimation.tsx # Custom POW mining animation
├── hooks/
│   └── useBlockchainData.ts # Hook for fetching blockchain data
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## API Integration

The landing page fetches live data from the Bitcoin Silver blockchain explorer:

- Block height
- Network hashrate
- Difficulty
- Circulating supply
- Network nodes
- And more...

Data is automatically refreshed every 30 seconds.

## Customization

### Colors

Edit the color scheme in `src/index.css` by modifying the CSS variables.

### Content

Update the content in the respective component files:
- Hero text: `src/components/HeroSection.tsx`
- Features: `src/components/FeaturesSection.tsx`
- Roadmap: `src/components/RoadmapSection.tsx`
- Messenger: `src/components/MessengerSection.tsx`

## Technologies Used

- **Vite** - Build tool
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Shadcn UI** - Component library
- **Lucide React** - Icons

## License

MIT