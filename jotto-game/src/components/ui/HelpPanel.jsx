import { useState } from 'react';

/**
 * Component that displays game instructions for new players
 */
const HelpPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="help-container">
      <button 
        className="help-button" 
        onClick={togglePanel}
        aria-expanded={isOpen}
      >
        {isOpen ? 'Hide Rules' : 'How to Play'}
      </button>
      
      {isOpen && (
        <div className="help-panel">
          <h3>How to Play Jotto</h3>
          
          <div className="help-section">
            <h4>Game Objective</h4>
            <p>Guess the secret 5-letter word in as few attempts as possible.</p>
          </div>
          
          <div className="help-section">
            <h4>Rules</h4>
            <ol>
              <li>The computer selects a secret 5-letter word.</li>
              <li>You make guesses with 5-letter words.</li>
              <li>After each guess, you'll see how many letters from your guess appear in the secret word.</li>
              <li><strong>Important:</strong> You only see the COUNT of matching letters, not WHICH letters match.</li>
              <li>Letters are counted only once. For example, if you guess "HELLO" and the secret word is "WORLD", you get 2 matches (L and O).</li>
              <li>The position of the letters doesn't matter for counting matches.</li>
              <li>You have 10 attempts to guess the word.</li>
            </ol>
          </div>
          
          <div className="help-section">
            <h4>Example</h4>
            <p>Secret word: "TRAIN"</p>
            <table className="help-example-table">
              <thead>
                <tr>
                  <th>Guess</th>
                  <th>Matching Letters</th>
                  <th>Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PLANE</td>
                  <td>3</td>
                  <td>A, N, E are in TRAIN</td>
                </tr>
                <tr>
                  <td>STORM</td>
                  <td>1</td>
                  <td>R is in TRAIN</td>
                </tr>
                <tr>
                  <td>BRAIN</td>
                  <td>4</td>
                  <td>R, A, I, N are in TRAIN</td>
                </tr>
                <tr>
                  <td>TRAIN</td>
                  <td>5</td>
                  <td>All letters match - you win!</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="help-section">
            <h4>How Jotto Differs from Wordle</h4>
            <p>Unlike Wordle, Jotto:</p>
            <ul>
              <li>Only tells you HOW MANY letters match, not which specific ones</li>
              <li>Doesn't give information about letter positions</li>
              <li>Requires deduction across multiple guesses to determine which letters are in the word</li>
            </ul>
          </div>
          
          <div className="help-section">
            <h4>Strategy Tips</h4>
            <ul>
              <li>Start with words that have common letters (E, A, R, I, O, T).</li>
              <li>Use the Letter Tracker to keep track of which letters have been eliminated.</li>
              <li>If a guess has zero matches, all those letters are eliminated.</li>
              <li>Compare guesses with different match counts to deduce which letters are in the word.</li>
              <li>Try to use different letters in each guess until you start narrowing down the possibilities.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpPanel;
