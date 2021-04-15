/** Command-line tool to generate Markov text. */

const fsP = require("fs/promises");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

