import { useRef, useEffect, useState } from 'react';

/**
 * Component to display guess results and letter matches
 */
const GuessResults = ({ guesses, matches }) => {
  // Create a ref for the container to enable auto-scrolling
  const resultsContainerRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Auto-scroll to the bottom when new guesses are added
  useEffect(() => {
    if (resultsContainerRef.current && guesses.length > 0) {
      resultsContainerRef.current.scrollTop = resultsContainerRef.current.scrollHeight;
    }
  }, [guesses]);
  
  // Toggle help text
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  if (!guesses || guesses.length === 0) {
    return (
      <div className="guess-results">
        <div className="guess-results-header">
          <h3>Your Guesses</h3>
          <button 
            className="help-toggle-button"
            onClick={toggleHelp}
            aria-expanded={showHelp}
          >
            {showHelp ? '×' : '?'}
          </button>
        </div>
        
        {showHelp && (
          <div className="guess-results-help">
            <p>In Jotto, after each guess you'll see how many letters from your guess appear in the secret word.</p>
            <p>For example, if the secret word is "TRAIN" and you guess "PLANE", you'd get 3 matches (A, N, E).</p>
            <p>The position of the letters doesn't matter - only whether they appear in the word.</p>
          </div>
        )}
        
        <p className="no-guesses">Make your first guess!</p>
      </div>
    );
  }

  return (
    <div className="guess-results">
      <div className="guess-results-header">
        <h3>Your Guesses</h3>
        <button 
          className="help-toggle-button"
          onClick={toggleHelp}
          aria-expanded={showHelp}
        >
          {showHelp ? '×' : '?'}
        </button>
      </div>
      
      {showHelp && (
        <div className="guess-results-help">
          <p>In Jotto, after each guess you'll see how many letters from your guess appear in the secret word.</p>
          <p>For example, if the secret word is "TRAIN" and you guess "PLANE", you'd get 3 matches (A, N, E).</p>
          <p>The position of the letters doesn't matter - only whether they appear in the word.</p>
        </div>
      )}
      
      <div className="guess-results-container" ref={resultsContainerRef}>
        <table>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          <tbody>
            {guesses.map((guess, index) => (
              <tr key={index} className={index === guesses.length - 1 ? 'latest-guess' : ''}>
                <td className="guess-word">{guess}</td>
                <td className="match-count">
                  <div className="match-indicator">
                    <span className="match-number">{matches[index] || 0}</span>
                    <span className="match-text">
                      {matches[index] === 1 ? 'letter' : 'letters'}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="guess-tip">
        <p>
          {guesses.length === 1 
            ? "The number shows how many letters from your guess appear in the secret word." 
            : "Compare your guesses to deduce which letters are in the secret word."}
        </p>
      </div>
    </div>
  );
};

export default GuessResults;
