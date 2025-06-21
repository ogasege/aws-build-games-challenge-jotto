import { useState, useEffect } from 'react';
import { countMatchingLetters, isCorrectGuess, getRandomWord, sampleWords } from '../utils/wordUtils';

/**
 * Custom hook to manage the Jotto game state and logic
 */
const useJottoGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [matches, setMatches] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const maxAttempts = 10;

  // Initialize the game with a random word and load high scores
  useEffect(() => {
    loadHighScores();
    startNewGame();
  }, []);

  const loadHighScores = () => {
    const savedScores = localStorage.getItem('jottoHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  };

  const saveHighScore = (newScore) => {
    const updatedScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep only top 10 scores
    
    setHighScores(updatedScores);
    localStorage.setItem('jottoHighScores', JSON.stringify(updatedScores));
  };

  const calculateScore = () => {
    // Base score: 1000 points
    // Subtract 50 points for each attempt
    // Minimum score is 100
    const baseScore = 1000;
    const penaltyPerAttempt = 50;
    const calculatedScore = Math.max(100, baseScore - (attempts * penaltyPerAttempt));
    return calculatedScore;
  };

  const startNewGame = () => {
    const newSecretWord = getRandomWord(sampleWords);
    setSecretWord(newSecretWord);
    setGuesses([]);
    setMatches([]);
    setGameStatus('playing');
    setAttempts(0);
    setScore(0);
    
    console.log('New game started!');
    // For development only - remove in production
    console.log('Secret word:', newSecretWord);
  };

  const submitGuess = (guess) => {
    if (gameStatus !== 'playing') return;
    
    const normalizedGuess = guess.toLowerCase();
    const matchCount = countMatchingLetters(normalizedGuess, secretWord);
    
    setGuesses([...guesses, normalizedGuess]);
    setMatches([...matches, matchCount]);
    setAttempts(attempts + 1);
    
    // Check if the player won
    if (isCorrectGuess(normalizedGuess, secretWord)) {
      const finalScore = calculateScore();
      setScore(finalScore);
      setGameStatus('won');
      
      // Save high score
      const newHighScore = {
        score: finalScore,
        word: secretWord,
        attempts: attempts + 1,
        date: new Date().toISOString()
      };
      saveHighScore(newHighScore);
    } 
    // Check if the player lost (used all attempts)
    else if (attempts + 1 >= maxAttempts) {
      setGameStatus('lost');
    }
  };

  return {
    secretWord,
    guesses,
    matches,
    gameStatus,
    attempts,
    maxAttempts,
    score,
    highScores,
    submitGuess,
    startNewGame
  };
};

export default useJottoGame;
