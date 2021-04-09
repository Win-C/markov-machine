"use strict";

/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.words = text.split(/[ \r\n]+/); // ["the", "cat", "in", "the", "hat"]
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1] || null;
      if (!(chains.has(word))) {
        chains.set(word, []);
      }
      chains.get(word).push(nextWord);
    }

    this.chains = chains;
  }

  /** return a random value from array */

  static choice(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** return random text from chains */

  getText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let randomWords = [];

    while (randomWords.length < numWords && key !== null){
      const { word, nextKey } = this._getNextLink(key);
      randomWords.push(word);
      key = nextKey;
    }

    return randomWords.join(' ');
  }

  /** Get next word and next key */

  _getNextLink(key){
    return {
      word: key,
      nextKey: MarkovMachine.choice(this.chains.get(key)),
    };
  }
}

module.exports = {
  MarkovMachine,
};