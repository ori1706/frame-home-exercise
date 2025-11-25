import './Instructions.css';

export const Instructions: React.FC = () => {
  return (
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
  );
};

