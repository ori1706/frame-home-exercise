import React from 'react';
import './ActionButtons.css';

interface ActionButtonsProps {
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
  canReset: boolean;
  loading: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onUndo,
  onReset,
  canUndo,
  canReset,
  loading,
}) => {
  return (
    <div className="action-buttons">
      <button
        onClick={onUndo}
        className="btn btn-secondary"
        disabled={!canUndo || loading}
      >
        Undo
      </button>
      <button
        onClick={onReset}
        className="btn btn-danger"
        disabled={!canReset || loading}
      >
        Reset
      </button>
    </div>
  );
};

