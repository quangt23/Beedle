import React, {useState } from 'react';
import Navbar from '../Navbar/navbar'; // Adjust path as necessary
import './game.css'

const words = [
    "apple",
    "banana",
    "cherry",
    "grape",
    "orange",
];

const Game = () => {
    const [currentWord, setCurrentWord] = useState("");

    const playWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        setCurrentWord(word);
        const utterance = new SpeechSynthesisUtterance(word);
        speechSynthesis.speak(utterance);
    };

    return (
    <div className="game-container">
        <div className='difficulty'>Easy</div>
        <div className='listen'>
            <button onClick={playWord}>Play Me</button>
        </div>
        <div className='health'></div>
        <div className=''></div>
    </div>
  );
};

export default Game;
