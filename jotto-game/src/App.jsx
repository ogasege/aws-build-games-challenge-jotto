import { useState } from 'react'
import './App.css'
import GameBoard from './components/game/GameBoard'
import GuessInput from './components/game/GuessInput'
import GuessResults from './components/game/GuessResults'
import LetterTracker from './components/game/LetterTracker'
import GameProgress from './components/game/GameProgress'
import HelpPanel from './components/ui/HelpPanel'
import ScoreBoard from './components/ui/ScoreBoard'
import FirstTimeExperience from './components/ui/FirstTimeExperience'
import useJottoGame from './hooks/useJottoGame'
// Import the logo
import jottoLogo from '/Jotto.png'

function App() {
  const {
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
  } = useJottoGame();

  return (
    <FirstTimeExperience>
      <div className="jotto-app">
        <header>
          <div className="logo-container">
            <img src={jottoLogo} alt="Jotto Logo" className="jotto-logo" />
            <h1>Jotto Word Puzzle</h1>
          </div>
          <p>Find the secret 5-letter word by guessing!</p>
          <div className="header-controls">
            <HelpPanel />
            <ScoreBoard score={score} highScores={highScores} />
          </div>
        </header>

        <main>
          {gameStatus === 'playing' ? (
            <>
              <GameProgress attempts={attempts} maxAttempts={maxAttempts} />
              
              <GuessInput onSubmitGuess={submitGuess} />
              
              <GuessResults guesses={guesses} matches={matches} />
              
              <LetterTracker guesses={guesses} matches={matches} />
            </>
          ) : gameStatus === 'won' ? (
            <div className="game-result win">
              <h2>Congratulations!</h2>
              <p>You found the secret word: <strong>{secretWord}</strong></p>
              <p>It took you {attempts} {attempts === 1 ? 'guess' : 'guesses'}</p>
              <p>Your score: <strong>{score}</strong></p>
              <button onClick={startNewGame}>Play Again</button>
            </div>
          ) : (
            <div className="game-result lose">
              <h2>Game Over</h2>
              <p>The secret word was: <strong>{secretWord}</strong></p>
              <button onClick={startNewGame}>Try Again</button>
            </div>
          )}
        </main>
        
        <footer>
          <p>Jotto is a classic word game where you guess a secret word and receive feedback on how many letters match.</p>
        </footer>
      </div>
    </FirstTimeExperience>
  )
}

export default App
