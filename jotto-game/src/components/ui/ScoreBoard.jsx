import { useState } from 'react';

/**
 * Component to display high scores
 */
const ScoreBoard = ({ score, highScores }) => {
  const [showScores, setShowScores] = useState(false);

  const toggleScores = () => {
    setShowScores(!showScores);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="score-container">
      {score > 0 && (
        <div className="current-score">
          <h3>Your Score: {score}</h3>
        </div>
      )}
      
      <button 
        className="score-button" 
        onClick={toggleScores}
        aria-expanded={showScores}
      >
        {showScores ? 'Hide High Scores' : 'Show High Scores'}
      </button>
      
      {showScores && (
        <div className="score-panel">
          <h3>High Scores</h3>
          
          {highScores.length === 0 ? (
            <p>No high scores yet. Be the first!</p>
          ) : (
            <table className="score-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Score</th>
                  <th>Word</th>
                  <th>Attempts</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {highScores.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.score}</td>
                    <td>{entry.word}</td>
                    <td>{entry.attempts}</td>
                    <td>{formatDate(entry.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
