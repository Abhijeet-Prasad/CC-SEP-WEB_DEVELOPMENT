import React from 'react'
import backgroundBanner from '../assets/background-banner5.jpg';
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero">
        <div className='hero-background'>
            <img src={backgroundBanner} className='bgBanner' alt=''/>
            <div className='background-overlay'></div>
        </div>
        <div className="hero-content">
            <h1>Movie Reviews Sentiment Analysis</h1>
            <a href='#analyzerContainer'>Start Analysing</a>
        </div>
    </div>
    
  )
}

export default Hero