import { ForceGraph } from '../ForceGraph/ForceGraph';
import { GraphData } from '../../types';
import './GraphContainer.css';

interface GraphContainerProps {
  data: GraphData;
  onNodeClick: (nodeId: string) => void;
}

export const GraphContainer: React.FC<GraphContainerProps> = ({ data, onNodeClick }) => {
  if (data.nodes.length === 0) {
    return (
      <div className="graph-container">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h2>Start Exploring</h2>
          <p>Enter a word above to begin building your association graph</p>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-container">
      <ForceGraph
        data={data}
        onNodeClick={onNodeClick}
        width={Math.min(window.innerWidth - 80, 1000)}
        height={600}
      />
    </div>
  );
};
