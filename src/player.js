import { randomInRange } from "./util";
import { InputManager } from "./inputManager";

export class Player {
  status;
  inputManager;
  name;

  static DEFAULT_PLAYER = {
    status: "non-predictor",
    name: "Player"
  };

  constructor(_props = {}) {
    const props = { ...Player.DEFAULT_PLAYER, ..._props };
    this.status = props.status;
    this.name = props.name;
    this.inputManager = new InputManager();
  }

  setPredictorStatus(status) {
    this.status = status;
    return this.status;
  }

  async nonPredictorAction() {
    const input = await this.inputManager.getInputFromKeyboard(
      "You are not the predictor, what is your input?\n"
    );
    const action = this.inputManager.textToAction(input);
    if (action.numberOfOpenHand)
      throw Error(
        "Bad input: no prediction expected, you are not the predictor."
      );
    return { ...action, actor: this.name };
  }

  async predictorAction() {
    const input = await this.inputManager.getInputFromKeyboard(
      "You are the predictor, what is your input?\n"
    );
    const action = this.inputManager.textToAction(input);
    if (action.numberOfOpenHand === undefined)
      throw Error("Bad input:prediction expected, you are the predictor.");
    return { ...action, actor: this.name };
  }

  turnAction() {
    const { status } = this;
    if (status === "non-predictor") return this.nonPredictorAction();
    else return this.predictorAction();
  }
}

export class Bot extends Player {
  possibleHand = ["C", "O"];
  constructor(props = {}) {
    super({ ...props, name: "Bot" });
  }

  randomHand() {
    return this.possibleHand[randomInRange(2)];
  }

  async nonPredictorAction() {
    return {
      hand1: this.randomHand(),
      hand2: this.randomHand(),
      numberOfOpenHand: undefined,
      actor: this.name
    };
  }

  async predictorAction() {
    const hand1 = this.randomHand();
    const hand2 = this.randomHand();
    const totalOpenHand = (hand1 === "O" + hand2) === "O";
    return {
      hand1,
      hand2,
      numberOfOpenHand: totalOpenHand + randomInRange(5 - totalOpenHand),
      actor: this.name
    };
  }
}
