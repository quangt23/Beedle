import React, { useState, useEffect } from 'react';
import benevolentAudio from '../../assets/benevolent.mp3';
import juxtaposeAudio from '../../assets/juxtapose.mp3';
import kaleidoscopeAudio from '../../assets/kaleidoscope.mp3';
import beeIcon from '../../assets/bee-90px.png'; // Ensure you have a bee icon

const words = [
  { word: 'benevolent', audio: benevolentAudio },
  { word: 'juxtapose', audio: juxtaposeAudio },
  { word: 'kaleidoscope', audio: kaleidoscopeAudio },
];

const Game = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const maxGuesses = 4;

  const getDailyWordIndex = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    const dayNumber = Math.floor(midnight.getTime() / (1000 * 60 * 60 * 24));
    return dayNumber % words.length;
  };

  const playAudioHint = (duration) => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audio.currentTime = 0;

    audio.onloadedmetadata = () => {
      audio
        .play()
        .then(() => {
          setTimeout(() => {
            audio.pause();
          }, duration);
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    };
  };

  const handleHintClick = (level) => {
    if (level > hintLevel + 1) return; // Prevent accessing higher-level hints

    switch (level) {
      case 1:
        playAudioHint(300); // 0.3 seconds
        setHintLevel(1);
        break;
      case 2:
        playAudioHint(600); // 0.6 seconds
        setHintLevel(2);
        break;
      case 3:
        const fullAudio = new Audio(audioUrl);
        fullAudio.play();
        setHintLevel(3);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const index = getDailyWordIndex();
    const { word, audio } = words[index];
    setCurrentWord(word);
    setAudioUrl(audio);
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value.toUpperCase().slice(0, currentWord.length));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && userInput.length === currentWord.length) {
      evaluateGuess();
    }
  };

  const evaluateGuess = () => {
    const guess = userInput.toLowerCase();
    const targetWord = currentWord.toLowerCase();

    const targetLetterCount = {};
    for (const char of targetWord) {
      targetLetterCount[char] = (targetLetterCount[char] || 0) + 1;
    }

    const result = Array(currentWord.length).fill('incorrect');

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetWord[i]) {
        result[i] = 'correct';
        targetLetterCount[guess[i]]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (result[i] !== 'correct') {
        if (targetLetterCount[guess[i]] > 0) {
          result[i] = 'misplaced';
          targetLetterCount[guess[i]]--;
        }
      }
    }

    if (result.every((status) => status === 'correct')) {
      setHasWon(true);
    } else if (guesses.length + 1 === maxGuesses) {
      setHasLost(true);
    }

    setGuesses([...guesses, { guess, result }]);
    setUserInput('');
  };

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen bg-[#f1f0ea] p-6">
        <div className='mx-auto'>
            <div className='flex flex-row justify-center items-center mb-4 '>
                <img src={beeIcon} alt="Bee Icon" className='w-24 h-24' />
            </div>
            <div className='flex flex-row justify-center items-center gap-4 mb-24'>
                <button 
                onClick={() => handleHintClick(1)} 
                disabled={hintLevel > 1} 
                className={`py-2 px-4 rounded ${hintLevel >= 1 ? 'bg-gray-500 text-white' : 'bg-[#f9cc58] text-white'}`}
                >
                0.3s
                </button>
                <button 
                onClick={() => handleHintClick(2)} 
                disabled={hintLevel < 1 || hintLevel > 2} 
                className={`py-2 px-4 rounded ${hintLevel >= 2 ? 'bg-gray-500 text-white' : 'bg-[#f9cc58] text-white'}`}
                >
                0.5s
                </button>
                <button 
                onClick={() => handleHintClick(3)} 
                disabled={hintLevel < 2} 
                className={`py-2 px-4 rounded ${hintLevel >= 3 ? 'bg-gray-500 text-white' : 'bg-[#f9cc58] text-white'}`}
                >
                Full
                </button>
            </div>

            <input
                type='text'
                className='border-2 border-gray-300 rounded p-2 mt-4'
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Type your guess here'
                maxLength={currentWord.length}
                autoFocus
            />

            <div className='flex flex-col items-center gap-2 mt-4'>
                {Array.from({ length: maxGuesses }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    className={`flex gap-2 ${rowIndex % 2 !== 0 ? 'ml-14' : ''}`}
                >
                    {Array.from({ length: currentWord.length }).map((_, colIndex) => {
                    const char = guesses[rowIndex]?.guess[colIndex]?.toUpperCase() || '';
                    const status =
                        guesses[rowIndex]?.result[colIndex] || 'bg-orange-500';
                    return (
                        <div
                        key={colIndex}
                        className={`w-12 h-12 flex items-center justify-center text-black font-bold uppercase 
                            ${status === 'correct' ? 'bg-orange-500 text-white' : status === 'misplaced' ? 'bg-black text-white' : 'bg-white text-black '}`}
                        style={{
                            clipPath:
                            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                        }}
                        >
                        {char}
                        </div>
                    );
                    })}
                </div>
                ))}
            </div>

            {hasWon && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
                <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                    <p className='text-xl font-bold mb-4'>You won!</p>
                    <button
                    onClick={() => setHasWon(false)}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                    >
                    Close
                    </button>
                </div>
                </div>
            )}

            {hasLost && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
                <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                    <p className='text-xl font-bold mb-4'>You lost :(</p>
                    <p className='text-lg mb-4'>The word was: {currentWord}</p>
                    <button
                    onClick={() => setHasLost(false)}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                    >
                    Close
                    </button>
                </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default Game;
