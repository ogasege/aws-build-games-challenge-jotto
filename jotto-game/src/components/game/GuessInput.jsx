import { useState } from 'react';

/**
 * Component for handling user word guesses
 */
const GuessInput = ({ onSubmitGuess }) => {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');
  
  const validateGuess = (input) => {
    // Only allow letters
    if (!/^[a-zA-Z]*$/.test(input)) {
      return false;
    }
    return true;
  };
  
  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    
    if (validateGuess(input)) {
      setGuess(input);
      setError('');
    } else {
      setError('Only letters are allowed');
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (guess.length !== 5) {
      setError('Guess must be exactly 5 letters');
      return;
    }
    
    onSubmitGuess(guess);
    setGuess('');
  };
  
  return (
    <div className="guess-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          placeholder="Enter a 5-letter word"
          maxLength={5}
          aria-label="Enter your guess"
        />
        <button type="submit" disabled={guess.length !== 5}>
          Submit Guess
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default GuessInput;
