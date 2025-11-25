import React from 'react';
import './EmptyState.css';

export const EmptyState: React.FC = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🔍</div>
      <h2>Start Exploring</h2>
      <p>Enter a word above to begin building your association graph</p>
    </div>
  );
};

