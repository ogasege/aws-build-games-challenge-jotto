import { useState, useEffect } from 'react';

/**
 * Component to enhance first-time user experience
 */
const FirstTimeExperience = ({ children }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem('jottoHasVisited');
    
    if (!hasVisitedBefore) {
      // First time visitor
      setShowWelcome(true);
      localStorage.setItem('jottoHasVisited', 'true');
    } else {
      setIsFirstVisit(false);
    }
  }, []);
  
  const closeWelcome = () => {
    setShowWelcome(false);
    setIsFirstVisit(false);
  };
  
  if (!showWelcome) {
    return children;
  }
  
  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <h2>Welcome to Jotto!</h2>
        
        <div className="welcome-content">
          <p>Jotto is a word guessing game where you try to figure out a secret 5-letter word.</p>
          
          <h3>How to Play:</h3>
          <ol>
            <li>Enter a 5-letter word as your guess</li>
            <li>You'll be told how many letters from your guess appear in the secret word</li>
            <li>Use this information to make better guesses</li>
            <li>Try to find the secret word in as few attempts as possible</li>
          </ol>
          
          <div className="welcome-example">
            <p><strong>Example:</strong> If the secret word is "TRAIN" and you guess "PLANE", you'd get 3 matches (A, N, E).</p>
          </div>
          
          <p>You have 10 attempts to guess the word. Good luck!</p>
        </div>
        
        <button className="welcome-button" onClick={closeWelcome}>
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default FirstTimeExperience;
