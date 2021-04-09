/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    this.words = text.split(/[ \r\n]+/); // ["the", "cat", "in", "the", "hat"]
    this.chains = this.makeChains(this.words);
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains(words) {
    let chains = {};

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const nextWord = words[i + 1] ? words[i + 1] : null;
      if (!(word in chains)) {
        chains[word] = [];
      }
      chains[word].push(nextWord);
    }

    return chains;
  }


  /** return random text from chains */

  getText(numWords = 100) {
    let randomIdx = Math.floor(Math.random() * this.words.length);
    let word = this.words[randomIdx];
    let text = word;
    let count = 1;

    while (count < numWords){
      let nextWordOptions = this.chains[word];
      randomIdx = Math.floor(Math.random() * nextWordOptions.length);
      word = nextWordOptions[randomIdx];
      if (word === null) break;
      text += ' '+word;
      count++;
    }

    return text;
  }
}

module.exports = {
  MarkovMachine,
};