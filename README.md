# Word Association Graph

An interactive word association graph built with React, TypeScript, and D3.js. Explore the connections between words using the DataMuse API and visualize them in a beautiful force-directed graph.

![Word Association Graph](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![D3.js](https://img.shields.io/badge/D3.js-7.8-orange) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## Features

✨ **Interactive Graph Visualization** - Beautiful force-directed graph powered by D3.js
🔍 **Word Association Discovery** - Fetches related words using the DataMuse API
🎯 **Click to Explore** - Click any node to discover its associations
♻️ **Smart Deduplication** - Words appear only once, even if they have multiple connections
⏮️ **Undo Functionality** - Revert your last action with the undo button
🎨 **Beautiful UI** - Modern, gradient-based design with smooth animations
📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
🖱️ **Interactive Controls** - Drag nodes, zoom, and pan the graph

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ori1706/frame-home-exercise.git
cd frame-home-exercise
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Enter a Word**: Type any word in the input field and click "Send"
2. **Explore Associations**: The graph will display the word and its related associations
3. **Click Nodes**: Click on any node in the graph to explore that word's connections
4. **Undo**: Use the "Undo" button to revert your last action
5. **Reset**: Click "Reset" to clear the entire graph and start fresh
6. **Interact**: 
   - Drag nodes to rearrange them
   - Scroll to zoom in/out
   - Drag the background to pan around

## Project Structure

```
frame-home-exercise/
├── src/
│   ├── components/
│   │   ├── ForceGraph.tsx       # Reusable D3 force graph component
│   │   └── ForceGraph.css       # Graph styling
│   ├── services/
│   │   └── datamuseApi.ts       # DataMuse API integration
│   ├── types.ts                 # TypeScript type definitions
│   ├── App.tsx                  # Main application component
│   ├── App.css                  # Application styling
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── package.json                 # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## Technologies Used

- **React 18** - UI library for building the interface
- **TypeScript** - Type-safe JavaScript
- **D3.js** - Data visualization library for the force-directed graph
- **Vite** - Fast build tool and development server
- **DataMuse API** - Word association data source

## Key Features Implementation

### Component Hierarchy

The application follows a clean component hierarchy:
- `App.tsx` - Main container with state management
- `ForceGraph.tsx` - Reusable D3 visualization component
- `datamuseApi.ts` - API service layer

### State Management

- Graph data (nodes and links) managed in App component
- History stack for undo functionality
- Loading and error states for better UX

### Deduplication Logic

Words are deduplicated using a Map-based approach:
- Each node has a unique ID (lowercase word)
- Before adding nodes, the app checks if they already exist
- Links are also checked to prevent duplicates in either direction

### D3 Force Graph

The force graph uses multiple forces:
- **Link Force**: Connects related words
- **Charge Force**: Pushes nodes apart for better spacing
- **Center Force**: Keeps the graph centered
- **Collision Force**: Prevents node overlap

## API Reference

The app uses the [DataMuse API](https://www.datamuse.com/api/) to fetch word associations:

```
GET https://api.datamuse.com/words?ml={word}&max={limit}
```

- `ml` - "Means like" - finds words with similar meaning
- `max` - Maximum number of results to return

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [DataMuse API](https://www.datamuse.com/api/) for providing word association data
- [D3.js](https://d3js.org/) for the powerful visualization library
- [React](https://react.dev/) for the component framework
