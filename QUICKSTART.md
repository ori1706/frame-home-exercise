# Quick Start Guide

## Running the Application

### Development Mode

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## How It Works

### 1. Architecture Overview

```
User Input → DataMuse API → Graph State → D3 Visualization
```

### 2. Component Flow

- **App.tsx**: Main container
  - Manages graph state (nodes & links)
  - Handles user input
  - Coordinates API calls
  - Maintains history for undo

- **ForceGraph.tsx**: Reusable D3 component
  - Renders force-directed graph
  - Handles node interactions
  - Manages zoom/pan/drag

- **datamuseApi.ts**: API service
  - Fetches word associations
  - Error handling

### 3. Key Features Implementation

#### Deduplication (Requirement #7)
- Uses Map with lowercase word IDs
- Checks existing nodes before adding
- Prevents duplicate links in both directions

#### Click to Search (Requirement #9)
- `onNodeClick` callback in ForceGraph
- Triggers new search from App component

#### Undo (Requirement #10)
- History stack stores previous states
- Each action saves current state
- Undo pops from history

#### Beautiful UI (Requirement #8)
- Gradient backgrounds
- Smooth animations
- Glass morphism effects
- Responsive design

## Testing the Application

Try these example words:
- **happy** - emotions and feelings
- **computer** - technology terms
- **ocean** - nature and geography
- **music** - arts and entertainment
- **science** - academic terms

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### API Rate Limiting
The DataMuse API is free but may have rate limits. If you encounter issues, wait a moment before trying again.

### Build Errors
Make sure all dependencies are installed:
```bash
npm install
```

## Development Tips

### Modifying the Graph
Edit `src/components/ForceGraph.tsx`:
- Adjust forces in the simulation
- Change node colors/sizes
- Modify interaction behavior

### Changing API Results
Edit `src/services/datamuseApi.ts`:
- Change `maxResults` parameter
- Use different DataMuse endpoints
- Add caching

### Styling
- `src/App.css` - Main application styles
- `src/components/ForceGraph.css` - Graph-specific styles
- `src/index.css` - Global styles

## Project Requirements Checklist

- ✅ React app with single page
- ✅ Text input, Send button, Reset button
- ✅ DataMuse API integration for word associations
- ✅ D3 force graph visualization
- ✅ Reset clears graph
- ✅ Adding words extends the graph
- ✅ Words deduplicated (show only once)
- ✅ Beautiful UI with gradients and animations
- ✅ Click on graph nodes to search
- ✅ Undo button (optional feature)
- ✅ Clean, reusable component structure
- ✅ TypeScript for type safety

Enjoy exploring word associations! 🎉

