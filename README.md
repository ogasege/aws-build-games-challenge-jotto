# Build Games Challenge: Jotto Word Puzzle

This repository contains a modern implementation of the classic Jotto word guessing game, built with React, Vite, and AWS Q Developer. The project showcases how to build an engaging, interactive word game using modern web technologies.

## About Jotto

Jotto is a classic word guessing game where players try to guess a secret 5-letter word. After each guess, players receive feedback on how many letters from their guess appear in the secret word (without revealing which specific letters match or their positions).

Unlike Wordle, Jotto focuses purely on letter matching without position information, making it a different kind of deductive challenge.

## Key Features

- Interactive game board with real-time feedback
- Letter tracker to help with deduction
- Auto-scrolling guess history
- High score system with persistent storage
- First-time user experience with welcome modal
- Comprehensive help panel with game rules and examples
- Responsive design for all device sizes
- Accessibility features

## Project Structure

```
aws-build-games-challenge-jotto/
├── jotto-game/           # Jotto word puzzle implementation
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utility functions
│   ├── README.md         # Game-specific documentation
│   └── RETRO_JOURNEY.md  # Development process documentation
└── README.md             # This file
```

## Getting Started

To run the Jotto game:

1. Navigate to the jotto-game directory:
   ```
   cd jotto-game
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Technologies Used

- React (with Hooks)
- Vite
- CSS3
- JavaScript (ES6+)
- LocalStorage for persistence
- AWS Q Developer

## Development Process

For a detailed look at how this game was developed, check out the [RETRO_JOURNEY.md](./jotto-game/RETRO_JOURNEY.md) file. This document provides insights into:

- The development approach and decisions
- Challenges faced and solutions implemented
- AI-assisted development techniques
- Code examples and explanations

## License

MIT
