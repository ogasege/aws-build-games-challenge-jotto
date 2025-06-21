# Retro Journey: Building a Classic Jotto Word Puzzle Game

## The Game: Why Jotto?

Jotto is a classic word guessing game that predates modern digital games like Wordle. I chose to recreate this game because:

1. It has simple yet engaging mechanics - guess a 5-letter word and receive feedback on how many letters match
2. It offers a pure deduction challenge without revealing letter positions
3. It has nostalgic value while still being relevant to today's word game enthusiasts
4. The rules are straightforward but the gameplay requires strategy and vocabulary skills

Unlike Wordle, Jotto focuses purely on letter matching without position information, making it a different kind of deductive challenge that tests your ability to track and eliminate possibilities.

## Effective Prompting Techniques

Throughout this project, I discovered several effective prompting techniques when working with AWS Q Developer:

### 1. Structured Component Creation

Breaking down the application into specific components with clear responsibilities yielded better results:

```
Generate the shell of a new React app for a word puzzle game called Jotto. Use Vite for setup
```

This initial prompt established the project structure and technology stack clearly.

### 2. Iterative Refinement

When facing issues with text visibility, I used specific problem descriptions:

```
I can't see the texts in the guess and matching letters
```

This prompted targeted CSS improvements rather than a complete redesign.

### 3. Feature-Based Expansion

Adding new features was most effective when describing the user experience rather than implementation details:

```
Do you want to include panel that explains how the game works? it can pop up when selected by a noob
```

### 5. Usability-Focused Improvements

When I noticed usability issues, I asked direct questions about specific features:

```
Your guesses should automatically scroll when there is a new addition, do you not think?
```

```
Do you want to fix the letter tracker though? it does not help me effectively
```

These prompts led to targeted functional improvements rather than just visual changes.

## The Role of AWS Q Developer

For this project, I used AWS Q Developer to assist with various aspects of development. This tool helped me:

- Generate initial project scaffolding and component structures
- Implement complex game logic like the letter matching algorithm
- Create responsive CSS designs that work across different devices
- Debug issues in the letter tracker's deduction logic
- Refine the user experience with features like auto-scrolling and first-time user onboarding

AWS Q Developer proved particularly valuable for rapidly prototyping ideas and implementing features that would have taken significantly longer to code manually. The tool's ability to understand game mechanics and translate them into working code accelerated the development process considerably.

## How I Tackled Classic Programming Challenges

### State Management

I implemented React state management patterns with a custom hook (`useJottoGame`) that encapsulated game logic:

```javascript
const useJottoGame = () => {
  const [secretWord, setSecretWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [matches, setMatches] = useState([]);
  const [gameStatus, setGameStatus] = useState('playing');
  // ...other state variables

  // Game logic functions
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

  const startNewGame = () => {
    const newSecretWord = getRandomWord(sampleWords);
    setSecretWord(newSecretWord);
    setGuesses([]);
    setMatches([]);
    setGameStatus('playing');
    setAttempts(0);
    setScore(0);
  };

  // Return state and functions
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
```

This approach cleanly separated concerns and made the game logic reusable.

### Algorithm Implementation

The letter matching algorithm was implemented efficiently:

```javascript
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
```

Using Sets for this operation was an elegant solution that handles the Jotto matching rules correctly. The algorithm efficiently:

1. Converts both words to lowercase for case-insensitive comparison
2. Creates Sets of unique letters from each word
3. Counts how many letters from the guess appear in the secret word
4. Returns the match count

This implementation correctly follows Jotto rules where each unique letter is counted only once, regardless of how many times it appears in either word.

### Persistent Storage

For data persistence, I used localStorage to save game progress and high scores:

```javascript
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
```

This implementation:
1. Loads existing scores from localStorage when the game initializes
2. Adds new scores to the list when the player wins
3. Sorts scores in descending order to maintain a proper leaderboard
4. Limits the leaderboard to the top 10 scores to prevent excessive storage use
5. Persists the updated leaderboard back to localStorage

## Development Automation That Saved Time

### 1. Project Scaffolding

With the help of AWS Q Developer, I generated the complete project structure with a single prompt, saving hours of setup time:

```bash
npm create vite@latest jotto-game -- --template react
```

This included:
- Creating the directory structure
- Setting up the Vite configuration
- Generating component files
- Creating utility modules
- Setting up CSS files
- Implementing the game logic

The project was organized with a clean, maintainable structure:

```
jotto-game/
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── GameBoard.jsx
│   │   │   ├── GuessInput.jsx
│   │   │   ├── GuessResults.jsx
│   │   │   ├── LetterTracker.jsx
│   │   │   └── GameProgress.jsx
│   │   └── ui/
│   │       ├── HelpPanel.jsx
│   │       ├── ScoreBoard.jsx
│   │       └── FirstTimeExperience.jsx
│   ├── hooks/
│   │   └── useJottoGame.js
│   ├── utils/
│   │   └── wordUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

### 2. CSS Generation

I developed comprehensive CSS that handled both styling and responsive design:

```css
/* Game Progress Styles */
.game-progress {
  width: 100%;
  max-width: 600px;
  margin-bottom: 1.5rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.attempts-count {
  font-weight: bold;
  color: var(--secondary-color);
}

.attempts-remaining {
  color: #666;
}

.progress-bar-container {
  width: 100%;
  height: 0.8rem;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .jotto-app {
    padding: 1rem;
  }
  
  header h1 {
    font-size: 2rem;
  }
  
  .guess-input form {
    flex-direction: column;
    align-items: center;
  }
  
  .guess-input input {
    width: 100%;
    max-width: 200px;
    margin-bottom: 0.5rem;
  }
}
```

This saved significant time that would have been spent on manual CSS adjustments and testing. The CSS included:

- A consistent color scheme using CSS variables
- Responsive design for different screen sizes
- Animations for user feedback
- Accessibility considerations
- Consistent spacing and typography

### 3. Component Creation

The React components were built with proper structure, props, and state management:

```jsx
const GuessResults = ({ guesses, matches }) => {
  if (!guesses || guesses.length === 0) {
    return <p className="no-guesses">Make your first guess!</p>;
  }

  return (
    <div className="guess-results">
      <h3>Your Guesses</h3>
      <div className="guess-results-container">
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
            ? "Keep guessing to narrow down the letters!" 
            : "Compare your guesses to deduce the secret word."}
        </p>
      </div>
    </div>
  );
};
```

This component demonstrates several best practices:
- Conditional rendering for empty state
- Proper use of map() with key props
- Dynamic class names based on component state
- Semantic HTML with table for tabular data
- Conditional text content based on data values
- Nested component structure for better organization

## Interesting Solutions

### 1. Improved Letter Tracker Component with Logical Deduction

One of the most interesting solutions was the enhanced Letter Tracker component that helps players track which letters they've used and make logical deductions:

```jsx
const LetterTracker = ({ guesses, matches }) => {
  // Create the alphabet
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  // Track which letters have been used in guesses
  const usedLetters = new Set();
  
  // Track which letters are confirmed to be in the secret word
  const confirmedLetters = new Set();
  
  // Track which letters are confirmed NOT to be in the secret word
  const eliminatedLetters = new Set();
  
  // Process all guesses to determine letter statuses using logical deduction
  if (guesses.length > 0) {
    // First, add all guessed letters to usedLetters
    guesses.forEach(guess => {
      const guessLetters = guess.toLowerCase().split('');
      guessLetters.forEach(letter => usedLetters.add(letter));
    });
    
    // Find words with zero matches - all letters in these words are eliminated
    guesses.forEach((guess, index) => {
      if (matches[index] === 0) {
        guess.toLowerCase().split('').forEach(letter => {
          eliminatedLetters.add(letter);
        });
      }
    });
    
    // Find words with all 5 letters matching - all letters in these words are confirmed
    guesses.forEach((guess, index) => {
      if (matches[index] === 5) {
        guess.toLowerCase().split('').forEach(letter => {
          confirmedLetters.add(letter);
        });
      }
    });
    
    // For words with some matches, use deduction
    guesses.forEach((guess, index) => {
      if (matches[index] > 0 && matches[index] < 5) {
        // For each letter in this guess
        guess.toLowerCase().split('').forEach(letter => {
          // If we've seen this letter in a word with zero matches, it's eliminated
          if (!eliminatedLetters.has(letter)) {
            // Check if this letter appears in all guesses with matches
            let appearsInAllMatchingGuesses = true;
            
            guesses.forEach((otherGuess, otherIndex) => {
              if (matches[otherIndex] > 0 && !otherGuess.toLowerCase().includes(letter)) {
                appearsInAllMatchingGuesses = false;
              }
            });
            
            // If this letter appears in all guesses with matches, it's likely in the word
            if (appearsInAllMatchingGuesses && guesses.filter((_, i) => matches[i] > 0).length > 1) {
              confirmedLetters.add(letter);
            }
          }
        });
      }
    });
    
    // Remove any letters from confirmedLetters if they're also in eliminatedLetters
    eliminatedLetters.forEach(letter => {
      confirmedLetters.delete(letter);
    });
  }
  
  // Get letter status
  const getLetterStatus = (letter) => {
    if (confirmedLetters.has(letter)) return 'confirmed';
    if (eliminatedLetters.has(letter)) return 'eliminated';
    if (usedLetters.has(letter)) return 'used';
    return 'unused';
  };
  
  return (
    <div className="letter-tracker">
      <h3>Letter Tracker</h3>
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
          <span>Used (Unknown)</span>
        </div>
        <div className="legend-item">
          <div className="letter-tile confirmed"></div>
          <span>In Word</span>
        </div>
        <div className="legend-item">
          <div className="letter-tile eliminated"></div>
          <span>Not in Word</span>
        </div>
      </div>
    </div>
  );
};
        }
      });
    }
  });
  
  // Get letter status
  const getLetterStatus = (letter) => {
    if (confirmedLetters.has(letter)) return 'confirmed';
    if (usedLetters.has(letter)) return 'used';
    return 'unused';
  };
  
  return (
    <div className="letter-tracker">
      <h3>Letter Tracker</h3>
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
          <span>Used in guesses</span>
        </div>
        <div className="legend-item">
          <div className="letter-tile confirmed"></div>
          <span>Likely in word</span>
        </div>
      </div>
    </div>
  );
};
```

This component cleverly uses Sets to track letter usage and provides visual feedback without revealing exact letter positions (keeping true to Jotto's mechanics). The implementation:

1. Creates a visual grid of all alphabet letters
2. Tracks which letters have been used in any guess
3. Uses a probabilistic approach to suggest which letters might be in the secret word
4. Provides a legend explaining the color coding
5. Includes ARIA labels for accessibility

### 2. First-Time User Experience

I created a sophisticated first-time user experience that detects new players and shows a welcome modal:

```jsx
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
```

This component:
1. Uses localStorage to detect first-time visitors
2. Displays a modal overlay with game instructions
3. Provides a clear example of how the game works
4. Offers a prominent button to start playing
5. Only shows once per user (unless they clear their browser data)

### 3. Score Calculation Algorithm

The scoring system uses a clever algorithm that rewards efficiency:

```javascript
const calculateScore = () => {
  // Base score: 1000 points
  // Subtract 50 points for each attempt
  // Minimum score is 100
  const baseScore = 1000;
  const penaltyPerAttempt = 50;
  const calculatedScore = Math.max(100, baseScore - (attempts * penaltyPerAttempt));
  return calculatedScore;
};
```

This algorithm:
1. Starts with a perfect score of 1000 points
2. Deducts 50 points for each guess attempt
3. Ensures a minimum score of 100 points even with many attempts
4. Creates a scoring system that rewards efficiency but doesn't overly punish exploration

### 4. Game Progress Component

The game progress component provides visual feedback on the player's progress:

```jsx
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
```

This component:
1. Calculates progress as a percentage of attempts used
2. Changes color based on how many attempts remain (green → yellow → red)
3. Displays encouraging messages that change as the game progresses
4. Includes proper ARIA attributes for accessibility
5. Provides both visual and textual feedback

## Game Features and Implementation Details

### Core Game Mechanics

The game follows traditional Jotto rules:
- Players guess a 5-letter word
- After each guess, they're told how many letters from their guess appear in the secret word
- The position of matching letters doesn't matter
- Players have a limited number of attempts (10) to guess the word

### User Interface Components

1. **Header Section**
   - Game title and brief description
   - Help panel toggle button
   - High scores panel toggle button

2. **Game Progress Indicator**
   - Visual progress bar showing attempts used
   - Text showing attempts remaining
   - Encouraging messages based on progress

3. **Guess Input**
   - Text input for entering 5-letter words
   - Submit button
   - Input validation (letters only, exactly 5 characters)
   - Error messages for invalid input

4. **Guess Results Table**
   - List of previous guesses
   - Number of matching letters for each guess
   - Highlighting for the most recent guess

5. **Letter Tracker**
   - Visual grid of all alphabet letters
   - Color coding to show used and potentially matching letters
   - Legend explaining the color codes

6. **Help Panel**
   - Game rules explanation
   - Strategy tips
   - Example of gameplay

7. **Score Board**
   - Current score display
   - High scores leaderboard
   - Persistent storage of scores

8. **First-Time User Experience**
   - Welcome modal for new players
   - Game instructions
   - Example of gameplay

### Technical Implementation

1. **React Components and Hooks**
   - Functional components with React hooks
   - Custom game logic hook (useJottoGame)
   - Component composition for UI organization

2. **State Management**
   - React useState for component state
   - Custom hook for game state
   - Props for component communication

3. **Styling**
   - CSS variables for consistent theming
   - Responsive design with media queries
   - Animations for user feedback
   - Accessibility considerations

4. **Data Persistence**
   - localStorage for saving high scores
   - localStorage for tracking first-time visitors

5. **Game Logic**
   - Word matching algorithm
   - Score calculation
   - Win/lose condition checking

## Conclusion

Building this Jotto word puzzle game demonstrated how effective modern development tools can be for rapid prototyping and development. With AWS Q Developer's assistance, I successfully:

1. Generated a complete React application structure
2. Implemented game logic following classic Jotto rules
3. Created responsive UI components with proper accessibility
4. Added sophisticated features like score tracking and first-time user experience
5. Provided iterative improvements based on feedback
6. Implemented intelligent deduction tools like the enhanced letter tracker
7. Added usability features like auto-scrolling guess results

The final product is a fully functional Jotto game that maintains the classic gameplay while offering modern UI features and responsive design. This project shows how modern development tools can help resurrect classic games for modern platforms while preserving their original charm and gameplay mechanics.

The development process highlighted several strengths of using AWS Q Developer:
- Rapid prototyping and iteration
- Comprehensive implementation of features
- Attention to details like accessibility and responsive design
- Ability to generate both functional code and visual styling
- Capacity to implement complex game logic and algorithms
- Adaptability to changing requirements and feedback

This retro journey demonstrates that modern development tools can be powerful allies for game development, especially when reviving classic games with modern implementations. The ability to quickly iterate on features and improve usability based on feedback makes tools like AWS Q Developer invaluable partners in the development process.
### 4. UI Evaluation Requests

Asking for UI evaluation led to comprehensive improvements:

```
What do you think of the user interface as is? is it standard? would it help users play the game appropriately?
```

This yielded thoughtful analysis and specific enhancement suggestions.
### 5. Auto-Scrolling Guess Results

The GuessResults component was enhanced with auto-scrolling functionality to improve user experience:

```jsx
const GuessResults = ({ guesses, matches }) => {
  // Create a ref for the container to enable auto-scrolling
  const resultsContainerRef = useRef(null);
  
  // Auto-scroll to the bottom when new guesses are added
  useEffect(() => {
    if (resultsContainerRef.current && guesses.length > 0) {
      resultsContainerRef.current.scrollTop = resultsContainerRef.current.scrollHeight;
    }
  }, [guesses]);
  
  if (!guesses || guesses.length === 0) {
    return <p className="no-guesses">Make your first guess!</p>;
  }

  return (
    <div className="guess-results">
      <h3>Your Guesses</h3>
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
            ? "Keep guessing to narrow down the letters!" 
            : "Compare your guesses to deduce the secret word."}
        </p>
      </div>
    </div>
  );
};
```

This implementation:
1. Uses React's `useRef` hook to create a reference to the scrollable container
2. Implements `useEffect` to automatically scroll to the bottom whenever new guesses are added
3. Ensures the most recent guess is always visible without requiring manual scrolling
4. Improves user experience by keeping the focus on the latest game information
## Fixing the Letter Tracker

During testing, we discovered issues with the letter tracker component: it was incorrectly identifying letters as being in the secret word. After multiple iterations, we implemented a sophisticated deduction algorithm that properly follows Jotto's logical principles.

### The Problem

Earlier implementations of the letter tracker were either too aggressive (showing too many letters as confirmed) or too conservative (not providing enough useful information). The challenge was to create a system that makes logical deductions similar to how a human player would approach the game.

### The Solution: Advanced Deduction Logic

We implemented a comprehensive deduction algorithm that applies multiple logical rules iteratively until no more progress can be made:

```javascript
// Process all guesses to determine letter statuses using logical deduction
if (guesses.length > 0) {
  // Step 1: Eliminate letters from guesses with zero matches
  guesses.forEach((guess, index) => {
    if (matches[index] === 0) {
      guess.toLowerCase().split('').forEach(letter => {
        eliminatedLetters.add(letter);
      });
    }
  });
  
  // Step 2: Confirm letters from guesses with all 5 letters matching
  guesses.forEach((guess, index) => {
    if (matches[index] === 5) {
      guess.toLowerCase().split('').forEach(letter => {
        confirmedLetters.add(letter);
      });
    }
  });
  
  // Step 3: Apply more sophisticated deduction logic
  let madeProgress = true;
  // Keep iterating as long as we're making progress in our deductions
  while (madeProgress) {
    madeProgress = false;
    
    // For each guess, check if we can deduce more information
    guesses.forEach((guess, index) => {
      if (matches[index] > 0) {
        const guessLetters = guess.toLowerCase().split('');
        
        // Count confirmed and eliminated letters in this guess
        let confirmedCount = 0;
        let eliminatedCount = 0;
        
        guessLetters.forEach(letter => {
          if (confirmedLetters.has(letter)) confirmedCount++;
          if (eliminatedLetters.has(letter)) eliminatedCount++;
        });
        
        // Case 3: If all letters except X are eliminated, and we need X more matches,
        // then those X letters must be in the word
        const nonEliminatedNonConfirmed = guessLetters.filter(
          letter => !eliminatedLetters.has(letter) && !confirmedLetters.has(letter)
        );
        
        if (nonEliminatedNonConfirmed.length === matches[index] - confirmedCount) {
          nonEliminatedNonConfirmed.forEach(letter => {
            if (!confirmedLetters.has(letter)) {
              confirmedLetters.add(letter);
              madeProgress = true;
            }
          });
        }
        
        // Case 4: If we've confirmed as many letters as there are matches,
        // all other letters in this guess must be eliminated
        if (confirmedCount === matches[index]) {
          guessLetters.forEach(letter => {
            if (!confirmedLetters.has(letter) && !eliminatedLetters.has(letter)) {
              eliminatedLetters.add(letter);
              madeProgress = true;
            }
          });
        }
      }
    });
  }
}
```

### Key Features of the Improved Algorithm:

1. **Iterative Deduction Process**
   - The algorithm repeatedly applies deduction rules until no more progress can be made
   - This mimics how a human player would gradually eliminate possibilities

2. **Multiple Deduction Rules**
   - Basic rules: Letters in zero-match guesses are eliminated; letters in full-match guesses are confirmed
   - Advanced rule 1: If we need X more matches and only X letters remain non-eliminated, those letters must be in the word
   - Advanced rule 2: If we've confirmed as many letters as there are matches, all other letters must be eliminated

3. **Logical Consistency Checks**
   - The algorithm checks for and handles contradictions in the deduction process
   - Final cleanup ensures no letter is marked as both confirmed and eliminated

This improved implementation provides accurate feedback to the player, making the letter tracker a truly useful tool for deduction in the Jotto game, while maintaining the core Jotto gameplay that's distinct from Wordle's position-based hints.

## Screenshots to Include

To properly document your Jotto game, you should include the following screenshots:

1. **Main Game Interface** - [SCREENSHOT: Show the complete game UI with the guess input, letter tracker, and progress bar]

2. **Welcome Modal** - [SCREENSHOT: Capture the first-time user experience modal that explains the game rules to new players]

3. **Game in Progress** - [SCREENSHOT: Show a game with several guesses made, displaying the guess history table and letter tracker with some letters marked as used/confirmed/eliminated]

4. **Letter Tracker in Action** - [SCREENSHOT: Close-up of the letter tracker showing different states of letters (unused, used, confirmed, eliminated)]

5. **Win Screen** - [SCREENSHOT: Capture the victory screen showing the secret word and final score]

6. **Game Over Screen** - [SCREENSHOT: Show the game over screen when a player has used all attempts without guessing the word]

7. **High Scores Panel** - [SCREENSHOT: Display the high scores leaderboard with some example scores]

8. **Help Panel** - [SCREENSHOT: Show the expanded help panel with game rules and examples]

9. **Mobile View** - [SCREENSHOT: Take a screenshot of how the game appears on a mobile device or in a narrow browser window to demonstrate responsive design]

10. **Auto-Scrolling Guesses** - [SCREENSHOT: Show the guess results container with multiple guesses, demonstrating how the latest guess is visible at the bottom]

11. **Logo Integration** - [SCREENSHOT: Show the Jotto logo in the header of the application]

These screenshots will help readers understand the game's interface, features, and user experience. Place them throughout the document near the relevant sections to illustrate the concepts being discussed.
## Enhancing the User Experience for Jotto Mechanics

After testing the game, we realized that players might not fully understand how Jotto differs from more familiar word games like Wordle. In Jotto, players only learn how many letters match, not which specific letters. This creates a different kind of deduction challenge that might not be immediately intuitive to new players.

To address this, we implemented three key improvements:

### 1. Simplified Letter Tracker with Clear Help Text

We redesigned the letter tracker to focus on what can be known with certainty in Jotto:

```jsx
const LetterTracker = ({ guesses, matches }) => {
  const [showHelp, setShowHelp] = useState(false);
  
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
  
  return (
    <div className="letter-tracker">
      <div className="letter-tracker-header">
        <h3>Letter Tracker</h3>
        <button 
          className="help-toggle-button"
          onClick={toggleHelp}
          aria-expanded={showHelp}
        >
          {showHelp ? 'Hide Help' : '?'}
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
      
      {/* Letter grid and legend */}
    </div>
  );
};
```

The new implementation:
- Focuses on what can be known with certainty (eliminated letters)
- Uses clearer color coding (blue for used letters, red for eliminated)
- Includes a help button with explanatory text
- Adds a deduction tip to remind players of Jotto's mechanics

### 2. Enhanced Guess Results with Contextual Help

We added help text to the guess results component to explain how to interpret match counts:

```jsx
const GuessResults = ({ guesses, matches }) => {
  const [showHelp, setShowHelp] = useState(false);
  
  // Toggle help text
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  return (
    <div className="guess-results">
      <div className="guess-results-header">
        <h3>Your Guesses</h3>
        <button 
          className="help-toggle-button"
          onClick={toggleHelp}
          aria-expanded={showHelp}
        >
          {showHelp ? 'Hide Help' : '?'}
        </button>
      </div>
      
      {showHelp && (
        <div className="guess-results-help">
          <p>In Jotto, after each guess you'll see how many letters from your guess appear in the secret word.</p>
          <p>For example, if the secret word is "TRAIN" and you guess "PLANE", you'd get 3 matches (A, N, E).</p>
          <p>The position of the letters doesn't matter - only whether they appear in the word.</p>
        </div>
      )}
      
      {/* Guess results table */}
      
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
```

This implementation:
- Adds a help button with contextual explanations
- Provides a concrete example of how matching works
- Includes a tip that changes based on game progress
- Emphasizes the need to compare guesses for deduction

### 3. Improved Help Panel with Jotto vs. Wordle Comparison

We expanded the help panel to clearly explain how Jotto differs from Wordle:

```jsx
<div className="help-section">
  <h4>How Jotto Differs from Wordle</h4>
  <p>Unlike Wordle, Jotto:</p>
  <ul>
    <li>Only tells you HOW MANY letters match, not which specific ones</li>
    <li>Doesn't give information about letter positions</li>
    <li>Requires deduction across multiple guesses to determine which letters are in the word</li>
  </ul>
</div>
```

We also added a detailed example table showing how matches are counted:

```jsx
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
```

These improvements collectively make the Jotto mechanics much clearer to players, especially those who might be more familiar with Wordle. By emphasizing the deduction aspect and providing clear guidance, we've made the game more accessible while maintaining its classic gameplay.
