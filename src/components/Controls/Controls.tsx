import { FormEvent } from 'react';
import './Controls.css';

interface ControlsProps {
  inputWord: string;
  loading: boolean;
  canUndo: boolean;
  canReset: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onUndo: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  inputWord,
  loading,
  canUndo,
  canReset,
  onInputChange,
  onSubmit,
  onUndo,
  onReset,
}) => {
  return (
    <div className="controls">
      <form onSubmit={onSubmit} className="input-form">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => onInputChange(e.target.value)}
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
    </div>
  );
};

