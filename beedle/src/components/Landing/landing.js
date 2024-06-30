import React from 'react';
import './landing.css';
import beeImage from '../../assets/bee-90px.png';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landing-container'>
      <img src={beeImage} alt="Bee"/>
      <h1 className='beedle-name'>Beedle</h1>
      <p className='beedle-description'>Listen to the Audio. <br/>Spell the word.<br/></p>
      <div className='button-container'>
        <button className='tutorial-button'>Tutorial</button>
        <button className='login-button'>Login</button>
        <Link to="/game" className='play-button'>
          Play
        </Link>
      </div>
      <footer className='footer'>
        &copy; {new Date().getFullYear()} Quang Tran. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
