import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="title">Word Association Graph</h1>
      <p className="subtitle">
        Explore the connections between words using the power of language
      </p>
    </header>
  );
};

