/**
 * Utility functions for word processing in the Jotto game
 */

/**
 * Count the number of matching letters between two words
 * In Jotto, we count how many letters from the guess appear in the secret word
 * 
 * @param {string} guess - The player's guess
 * @param {string} secretWord - The secret word to match against
 * @returns {number} - Count of matching letters
 */
export const countMatchingLetters = (guess, secretWord) => {
  if (!guess || !secretWord) return 0;
  
  const guessLetters = new Set(guess.toLowerCase().split(''));
  const secretLetters = new Set(secretWord.toLowerCase().split(''));
  
  let matchCount = 0;
  guessLetters.forEach(letter => {
    if (secretLetters.has(letter)) {
      matchCount++;
    }
  });
  
  return matchCount;
};

/**
 * Check if the guess is correct (matches the secret word)
 * 
 * @param {string} guess - The player's guess
 * @param {string} secretWord - The secret word to match against
 * @returns {boolean} - True if the guess matches the secret word
 */
export const isCorrectGuess = (guess, secretWord) => {
  return guess.toLowerCase() === secretWord.toLowerCase();
};

/**
 * Generate a random word from a word list
 * 
 * @param {Array<string>} wordList - List of possible words
 * @returns {string} - A randomly selected word
 */
export const getRandomWord = (wordList) => {
  if (!wordList || wordList.length === 0) {
    return '';
  }
  
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
};

// Sample 5-letter words for testing
export const sampleWords = [
  'apple', 'beach', 'chair', 'dance', 'eagle',
  'flame', 'grape', 'house', 'igloo', 'jumbo',
  'knife', 'lemon', 'mouse', 'night', 'ocean'
];
