import { useState, useCallback } from 'react';
import { ForceGraph } from './components/ForceGraph/ForceGraph';
import { fetchAssociatedWords } from './services/datamuseApi';
import { GraphData, GraphNode, GraphLink } from './types';
import './App.css';

interface GraphHistory {
  nodes: GraphNode[];
  links: GraphLink[];
}

function App() {
  const [inputWord, setInputWord] = useState('');
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GraphHistory[]>([]);

  /**
   * Add a word and its associations to the graph
   * Handles deduplication of nodes
   */
  const addWordToGraph = useCallback(async (word: string) => {
    if (!word.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch associated words from DataMuse API
      const associatedWords = await fetchAssociatedWords(word.toLowerCase(), 8);

      setGraphData(prevData => {
        // Save current state to history
        setHistory(prev => [...prev, { nodes: [...prevData.nodes], links: [...prevData.links] }]);

        const newNodes: GraphNode[] = [...prevData.nodes];
        const newLinks: GraphLink[] = [...prevData.links];
        
        // Create a map of existing nodes for quick lookup
        const nodeMap = new Map<string, GraphNode>();
        newNodes.forEach(node => nodeMap.set(node.id, node));

        // Add the source word as a node if it doesn't exist
        const sourceId = word.toLowerCase();
        if (!nodeMap.has(sourceId)) {
          const sourceNode: GraphNode = {
            id: sourceId,
            label: word.toLowerCase(),
          };
          newNodes.push(sourceNode);
          nodeMap.set(sourceId, sourceNode);
        }

        // Add associated words as nodes and create links
        associatedWords.forEach(assocWord => {
          const targetId = assocWord.word.toLowerCase();
          
          // Add node if it doesn't exist
          if (!nodeMap.has(targetId)) {
            const targetNode: GraphNode = {
              id: targetId,
              label: assocWord.word.toLowerCase(),
            };
            newNodes.push(targetNode);
            nodeMap.set(targetId, targetNode);
          }

          // Check if link already exists (in either direction)
          const linkExists = newLinks.some(link => {
            const linkSource = typeof link.source === 'string' ? link.source : link.source.id;
            const linkTarget = typeof link.target === 'string' ? link.target : link.target.id;
            return (
              (linkSource === sourceId && linkTarget === targetId) ||
              (linkSource === targetId && linkTarget === sourceId)
            );
          });

          // Add link if it doesn't exist
          if (!linkExists) {
            newLinks.push({
              source: sourceId,
              target: targetId,
            });
          }
        });

        return { nodes: newNodes, links: newLinks };
      });
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch word associations. Please try again.';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputWord.trim()) {
      addWordToGraph(inputWord.trim());
      setInputWord('');
    }
  };

  /**
   * Handle node click in the graph
   */
  const handleNodeClick = useCallback((nodeId: string) => {
    addWordToGraph(nodeId);
  }, [addWordToGraph]);

  /**
   * Reset the graph
   */
  const handleReset = () => {
    setGraphData({ nodes: [], links: [] });
    setHistory([]);
    setError(null);
    setInputWord('');
  };

  /**
   * Undo the last action
   */
  const handleUndo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setGraphData({ nodes: previousState.nodes, links: previousState.links });
    setHistory(prev => prev.slice(0, -1));
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">Word Association Graph</h1>
          <p className="subtitle">
            Explore the connections between words using the power of language
          </p>
        </header>

        <div className="controls">
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              placeholder="Enter a word..."
              className="word-input"
              disabled={loading}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading || !inputWord.trim()}
            >
              {loading ? 'Loading...' : 'Send'}
            </button>
          </form>

          <div className="action-buttons">
            <button
              onClick={handleUndo}
              className="btn btn-secondary"
              disabled={history.length === 0 || loading}
            >
              Undo
            </button>
            <button
              onClick={handleReset}
              className="btn btn-danger"
              disabled={graphData.nodes.length === 0 || loading}
            >
              Reset
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="graph-container">
          {graphData.nodes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h2>Start Exploring</h2>
              <p>Enter a word above to begin building your association graph</p>
            </div>
          ) : (
            <ForceGraph
              data={graphData}
              onNodeClick={handleNodeClick}
              width={Math.min(window.innerWidth - 80, 1000)}
              height={600}
            />
          )}
        </div>

        <div className="instructions">
          <h3>How to use:</h3>
          <ul>
            <li>Type a word and click "Send" to see its associations</li>
            <li>Click on any node in the graph to explore that word's connections</li>
            <li>Use "Undo" to revert the last action</li>
            <li>Click "Reset" to clear the entire graph</li>
            <li>Drag nodes to rearrange the graph</li>
            <li>Scroll to zoom in/out, drag the background to pan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

