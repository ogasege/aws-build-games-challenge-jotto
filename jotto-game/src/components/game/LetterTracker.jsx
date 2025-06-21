import { useState } from 'react';

/**
 * Component to track which letters have been used in guesses
 * and help with deduction in the Jotto game
 */
const LetterTracker = ({ guesses, matches }) => {
  const [showHelp, setShowHelp] = useState(false);
  
  // Create the alphabet
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  // Track which letters have been used in guesses
  const usedLetters = new Set();
  
  // Track which letters are definitely eliminated (not in the word)
  const eliminatedLetters = new Set();
  
  // Process all guesses to determine letter statuses
  if (guesses.length > 0) {
    // Add all guessed letters to usedLetters
    guesses.forEach(guess => {
      const guessLetters = guess.toLowerCase().split('');
      guessLetters.forEach(letter => usedLetters.add(letter));
    });
    
    // Eliminate letters from guesses with zero matches
    guesses.forEach((guess, index) => {
      if (matches[index] === 0) {
        guess.toLowerCase().split('').forEach(letter => {
          eliminatedLetters.add(letter);
        });
      }
    });
  }
  
  // Get letter status
  const getLetterStatus = (letter) => {
    if (eliminatedLetters.has(letter)) return 'eliminated';
    if (usedLetters.has(letter)) return 'used';
    return 'unused';
  };
  
  // Toggle help text
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  return (
    <div className="letter-tracker">
      <div className="letter-tracker-header">
        <h3>Letter Tracker</h3>
        <button 
          className="help-toggle-button"
          onClick={toggleHelp}
          aria-expanded={showHelp}
        >
          {showHelp ? '×' : '?'}
        </button>
      </div>
      
      {showHelp && (
        <div className="letter-tracker-help">
          <p>In Jotto, you need to deduce which letters are in the secret word:</p>
          <ul>
            <li><strong>Red letters</strong> are definitely <strong>not</strong> in the word (from guesses with 0 matches)</li>
            <li><strong>Blue letters</strong> have been used in guesses but could be in the word</li>
            <li><strong>Gray letters</strong> haven't been used yet</li>
          </ul>
          <p>Use the match counts from your guesses to deduce which blue letters might be in the word!</p>
        </div>
      )}
      
      <div className="letter-grid">
        {alphabet.map(letter => (
          <div 
            key={letter} 
            className={`letter-tile ${getLetterStatus(letter)}`}
            aria-label={`Letter ${letter}, status: ${getLetterStatus(letter)}`}
          >
            {letter}
          </div>
        ))}
      </div>
      
      <div className="letter-legend">
        <div className="legend-item">
          <div className="letter-tile unused"></div>
          <span>Unused</span>
        </div>
        <div className="legend-item">
          <div className="letter-tile used"></div>
          <span>Used (Might be in word)</span>
        </div>
        <div className="legend-item">
          <div className="letter-tile eliminated"></div>
          <span>Not in Word</span>
        </div>
      </div>
      
      <div className="deduction-tip">
        <p>Remember: In Jotto, you need to use deduction across multiple guesses to determine which letters are in the word!</p>
      </div>
    </div>
  );
};

export default LetterTracker;
