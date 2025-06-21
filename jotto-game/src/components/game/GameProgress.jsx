/**
 * Component to display game progress
 */
const GameProgress = ({ attempts, maxAttempts }) => {
  const progressPercentage = (attempts / maxAttempts) * 100;
  
  // Determine color based on progress
  const getProgressColor = () => {
    if (progressPercentage < 40) return 'progress-low';
    if (progressPercentage < 70) return 'progress-medium';
    return 'progress-high';
  };
  
  // Get encouraging message based on progress
  const getMessage = () => {
    if (attempts === 0) return "Make your first guess!";
    if (progressPercentage < 30) return "Great start! Keep going.";
    if (progressPercentage < 60) return "You're making progress!";
    if (progressPercentage < 80) return "Getting closer!";
    return "Final attempts - think carefully!";
  };
  
  return (
    <div className="game-progress">
      <div className="progress-info">
        <span className="attempts-count">Attempt {attempts} of {maxAttempts}</span>
        <span className="attempts-remaining">({maxAttempts - attempts} remaining)</span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className={`progress-bar ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={attempts}
          aria-valuemin="0"
          aria-valuemax={maxAttempts}
        ></div>
      </div>
      
      <p className="progress-message">{getMessage()}</p>
    </div>
  );
};

export default GameProgress;
