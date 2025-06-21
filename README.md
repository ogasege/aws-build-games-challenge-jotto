# Build Games Challenge: Build Classics with Amazon Q Developer CLI Submission

This repository contains classic word games reimplemented with modern web technologies. The project showcases how to build engaging, interactive games using React and other modern web frameworks.

### Jotto Word Puzzle

A modern implementation of the classic Jotto word guessing game. In Jotto, players try to guess a secret 5-letter word and receive feedback on how many letters from their guess appear in the secret word.

[Play Jotto](./jotto-game/)

#### Key Features:
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
aws-game/
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

Each game has its own README with specific instructions. Generally, you can:

1. Navigate to the game directory
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Build for production with `npm run build`

## Technologies Used

- React (with Hooks)
- Vite
- CSS3
- JavaScript (ES6+)
- LocalStorage for persistence

## Development Process

For a detailed look at how these games were developed, check out the RETRO_JOURNEY.md file in each game directory. These documents provide insights into:

- The development approach and decisions
- Challenges faced and solutions implemented
- AI-assisted development techniques
- Code examples and explanations

## Future Plans

- Add more classic word games
- Implement multiplayer functionality
- Create mobile apps using React Native
- Add more accessibility features

## License

MIT
