# Jotto Word Puzzle Game

A React implementation of the classic Jotto word guessing game, built with Vite.

## Game Rules

Jotto is a logic-based word game where:

1. The computer selects a secret 5-letter word
2. You make guesses with 5-letter words
3. After each guess, you're told how many letters in your guess appear in the secret word
4. The goal is to guess the secret word in as few attempts as possible

Unlike Wordle, Jotto only tells you HOW MANY letters match, not which specific ones or their positions.

## Features

- Interactive game board with real-time feedback
- Letter tracker to help with deduction
- Auto-scrolling guess history
- High score system with persistent storage
- First-time user experience with welcome modal
- Comprehensive help panel with game rules and examples
- Responsive design for all device sizes
- Accessibility features

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Building for Production

Build the project:

```bash
npm run build
```

## Implementation Details

The game includes several key components:

- **Letter Tracker**: Helps players track which letters have been used and which are eliminated
- **Game Progress**: Visual indicator of remaining attempts with encouraging messages
- **Guess Results**: History of guesses with matching letter counts
- **Help Panel**: Comprehensive game rules and examples
- **Score System**: Points based on how quickly you guess the word

For a detailed breakdown of the development process, see [RETRO_JOURNEY.md](./RETRO_JOURNEY.md).

## Technologies Used

- React (with Hooks)
- Vite
- CSS3
- JavaScript (ES6+)
- LocalStorage for persistence

## License

MIT
