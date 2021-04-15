const { MarkovMachine } = require("./markov");

/** Tests for MarkovMachine class and methods */

describe("markov machine", function () {
  test("makes chains", function () {
    let mm = new MarkovMachine("the cat in the hat");

    expect(mm.chains).toEqual(new Map([
      ["the", ["cat", "hat"]],
      ["cat", ["in"]],
      ["in", ["the"]],
      ["hat", [null]],
    ]))
  });

  test("makes random choice from an array", function () {
    expect(MarkovMachine.choice(["cat", "cat", "cat"])).toEqual("cat");
    expect(["cat", "hat", "in"]).toContain(MarkovMachine.choice(["cat", "hat", "in"]))
  });

  test("gets random text from chains", function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.getText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });

  test("generates valid text", function () {
    let bigrams = ["the cat", "the hat", "cat in", "in the", "hat "];
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.getText();
    expect(output.endsWith("hat")).toBe(true);

    let outputWords = mm.getText().split(/\ \r\n]+/);

    for (let i = 0; i < outputWords.length - 1; i++) {
      expect(bigrams).toContain(outputWords[i] + " " + outputWords[i + 1]);
    }
  });

  test("cuts off at length", function () {
    let mm = new MarkovMachine("the cat in the hat");
    let output = mm.getText(2);

    let outputWords = output.split(/\ \r\n]+/);
    expect([1, 2]).toContain(outputWords.length);
  });
});
