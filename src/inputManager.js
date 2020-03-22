import * as readlineSync from "readline-sync";

const readline = require("readline");

export class InputManager {
  static ERROR = {
    TYPE_1:
      "Bad input: correct input should be of the form CC3, where the first two letters indicate [O]pen or [C]losed state for each hand, followed by the prediction (0-4).",
    TYPE_2: "Bad input: prediction should be in the range of 0-4."
  };
  keyboard = null;
  number = 3;

  static INPUT_RULE = /(^[O,C]{1})([O,C]{1})([0-9]{1}$)?/;

  constructor() {
    this.keyboard = readlineSync;
  }

  getInputFromKeyboard(message = "") {
    return new Promise((resolve, reject) => {
      try {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question(message, function(text) {
          rl.close();
          resolve(text);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  validateInput(input) {
    const trimInput = input.trim();
    const matches = trimInput.match(InputManager.INPUT_RULE);
    if (!matches) throw Error(InputManager.ERROR.TYPE_1);

    if (+matches[3] > 4) throw Error(InputManager.ERROR.TYPE_2);
    return true;
  }
  textToAction(text) {
    const trimText = text.trim();
    if (!this.validateInput(text)) return;
    const matches = trimText.match(InputManager.INPUT_RULE);

    return {
      hand1: matches[1],
      hand2: matches[2],
      numberOfOpenHand: matches[3] ? +matches[3] : matches[3]
    };
  }
}
