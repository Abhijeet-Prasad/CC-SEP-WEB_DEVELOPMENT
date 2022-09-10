import React, { useState } from "react"
import Hero from './components/Hero';
import Popup from "./components/Popup";

import { WordTokenizer , SentimentAnalyzer, PorterStemmer } from 'natural'
import aposToLexForm from 'apos-to-lex-form'
import { spellCorrector } from "./components/spelling-corrector/spellCorrector"
import { removeStopwords } from 'stopword';
import Loading from "./components/Loading";

function App() {
    const [reviewText, setReviewText] = useState("");
    const [resultPopup, setResultPopup] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [sentiment, setSentiment] = useState("");
    const [symbol, setSymbol] = useState("");

    const handleChange = e => {
        setReviewText(e.target.value)
    }

    async function analyseReview(){
        setAnalyzing(true)
        let formattedReview = await cleanText(reviewText)
        const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
        let score = analyzer.getSentiment(formattedReview);
        
        if(score > 0){
            setSentiment('Posivite');
            setSymbol("https://img.icons8.com/emoji/100/000000/smiling-face-with-smiling-eyes.png");
        }
        else if(score < 0){
            setSentiment('Negative');
            setSymbol("https://img.icons8.com/emoji/100/000000/pouting-face.png");
        }
        else{
            setSentiment('Neutral');
            setSymbol("https://img.icons8.com/emoji/100/000000/expressionless-face.png");
        }

        console.log(sentiment)
        setResultPopup(true);
        setAnalyzing(false)
    }

    function cleanText(text){
        return new Promise(resolve => {
            setTimeout(() => {
                // convert contractions (e.g., I’m, you’re, etc.) to their standard lexicon (i.e., I am, you are, etc.)
                text = aposToLexForm(text);

                // Converting our text data to lowercase
                text = text.toLowerCase();

                // Removing non-alphabetical and special characters
                text = text.replace(/[^a-zA-Z\s]+/g, ' ');

                // splitting the text into individual word
                const tokenizer = new WordTokenizer();
                let words = tokenizer.tokenize(text);

                // Correcting misspelled words 
                var SpellingCorrector = new spellCorrector();

                words.forEach((word, index) => {
                    words[index] = SpellingCorrector.correct(word);
                })
      
                // remove all stop words that have no effect on a user’s sentiment, removing them will help us focus on the important keywords.
                var filteredWords = removeStopwords(words);

                resolve(filteredWords);
            }, 500);
          });
        
    }

    return (
        <div className="App">
            <Hero />
            <div className='analyzer-container' id="analyzerContainer">
                <div className='wrapper'>
                    <h1>Sentiment Analyzer</h1>
                    <p>Enter your review below and click analyse to find if your review positive or negative. </p>
                    <textarea value={reviewText} onChange={handleChange}></textarea>
                    <div className='button-group'>
                        <button className="analyzeBtn" onClick={analyseReview}>Analyse</button>
                        <button className="clearBtn" onClick={() => {setReviewText("");}}>Clear</button>
                    </div>
                </div>
            </div>
            {analyzing ? <Loading/> :
            <Popup trigger={resultPopup} setTrigger = {setResultPopup} sentiment={sentiment} image = {symbol} /> }
        </div>
    )
}

export default App;
