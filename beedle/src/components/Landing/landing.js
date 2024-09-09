import React from 'react';
import beeImage from '../../assets/bee-90px.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col justify-between items-center text-center h-screen bg-[#f1f0ea] p-6">
      <div className="flex flex-col items-center justify-center flex-grow w-1/4">
        <img src={beeImage} alt="Bee" className="mx-auto mb-4" />
        <h1 className="text-6xl font-extrabold">Beedle</h1>
        <p className="text-2xl font-semibold my-4">Listen to the Audio. <br />Spell the word.<br /></p>
        <div className="flex justify-center space-x-4 my-4 w-full max-w-lg">
          <button className="flex-1 p-3 rounded-full border-2 text-black border-black hover:bg-[#b6cb9e] transition duration-300">Tutorial</button>
          <button className="flex-1 p-3 rounded-full border-2 text-black border-black hover:bg-[#b6cb9e] transition duration-300">Login</button>
          <Link to="/game" className="flex-1 p-3 rounded-full border-2 text-black border-black bg-[#f9cc58] hover:bg-[#b6cb9e] transition duration-300 text-center">Play</Link>
        </div>
      </div>
      <footer className="text-center py-4">
        &copy; {new Date().getFullYear()} Quang Tran. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
