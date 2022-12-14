import {text} from './englisgWords';
var HashMap = require('hashmap');


class spellCorrector{
    constructor(){
        this.nWords = new HashMap();
        this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        this.loadDictionary();
    }

    loadDictionary(){
        var regex = /[a-z]+/g;
        var match, word;

        while ((match = regex.exec(text))) {
            word = match[0];
            var newCount = 1;
            if (this.nWords.has(word)) {
                newCount = newCount + this.nWords.get(word);
            }
            this.nWords.set(word, newCount);
        }
    }

    getEdits(word) {
        var result = [], i, j;
        for (i = 0; i < word.length; i++) result.push(word.slice(0, i) + word.slice(i + 1));
        for (i = 0; i < word.length - 1; i++) result.push(word.slice(0, i) + word.slice(i + 1, i + 2) + word.slice(i, i + 1) + word.slice(i + 2));
        for (i = 0; i < word.length; i++)
            for (j = 0; j < this.alphabet.length; j++) result.push(word.slice(0, i) + this.alphabet[j] + word.slice(i + 1));
        for (i = 0; i <= word.length; i++)
            for (j = 0; j < this.alphabet.length; j++) result.push(word.slice(0, i) + this.alphabet[j] + word.slice(i));
        return result;
    }

    bestCandidate(candidates) {
        var maxCount = 0;
        var word;
        candidates.forEach(function(value, key) {
            if (key > maxCount) {
                maxCount = key;
                word = value;
            }
        });
        return word;
    }

    correct(word){
        if (this.nWords.has(word)) {
            return word;
        }
        var suggestions = this.getEdits(word);
        var candidates = new HashMap();
        suggestions.forEach(function(curWord) {
            if (this.nWords.has(curWord)) {
                candidates.set(this.nWords.get(curWord), curWord);
            }
        }.bind(this));
    
        if (candidates.count() > 0) {
            return this.bestCandidate(candidates);
        }
    
        suggestions.forEach(function(curWord) {
            var newSuggestions = this.getEdits(curWord);
            newSuggestions.forEach(function(newWord) {
                if (this.nWords.has(newWord)) {
                    candidates.set(this.nWords.get(newWord), newWord);
                }
            }.bind(this));
        }.bind(this));
        return (candidates.count() > 0) ? this.bestCandidate(candidates) : word;
    }
}


export {spellCorrector};