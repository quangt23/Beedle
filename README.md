
# Spelling Bee Game 🐝🔠
**Created by:** Quang Tran

## Description 📝
This Spelling Bee Game challenges players to guess a daily word by listening to progressively longer audio hints. Players receive 3 hints of increasing length to help them guess the word. After each hint, they can input their guess, and the game provides feedback on whether their guess is correct, contains misplaced letters, or has incorrect letters. The game ends when the player either guesses the word correctly or exhausts their attempts.

## Prerequisites ⚙️
- Ensure you have **Node.js** installed on your system.
- Install project dependencies using `npm install`.

## Features ✨
- **Daily Word Challenge**: The game selects a new word every day at midnight, challenging players to guess the word using a sequence of audio hints.
- **Hint System**: Three levels of audio hints, starting with a 0.3-second clip, then a 0.5-second clip, and finally the full word.
- **Feedback Mechanism**: After each guess, the game displays colored feedback: 
  - Orange for correct letters,
  - Black for misplaced letters,
  - White for incorrect letters.
- **Progressive Hint Locking**: Players must use hints in order. Once a higher-level hint is unlocked, they cannot revert to previous ones.
- **Visual Gameplay**: Includes a hexagonal tile system to display guesses and results similar to popular word-guessing games.

## Controls 🕹️
- **Type your guess** into the input box and press **Enter** to submit.
- Click **Hint Buttons** to reveal audio clues in sequence.
  - Hint 1: 0.3 seconds of the word.
  - Hint 2: 0.5 seconds of the word.
  - Hint 3: Full pronunciation of the word.

## Issues ❗
At the moment, there are no known issues with the project. It appears to be functioning as intended.

## Source Files Used
- `benevolent.mp3`, `juxtapose.mp3`, `kaleidoscope.mp3` for audio clues.
- `bee-90px.png` for the bee icon.

## Build 🛠️
Clone the repository:
```bash
git clone https://github.com/quangt23/Spelling-Bee-Game.git
cd Spelling-Bee-Game
npm install
```

## Run 🚀
Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to play the game in your browser.

---

Enjoy the challenge and keep guessing! 🐝🎯
