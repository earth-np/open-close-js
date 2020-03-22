import { Player } from "./player";

export class Game {
  players;
  turn = 1;

  predictor;
  nonPredictors;

  constructor(props) {
    this.players = props.players;
  }

  resultingAction(predictorAction, nonPredictorActions) {
    const gameHands = nonPredictorActions.reduce(
      (pre, cur) => {
        return [...pre, cur.hand1, cur.hand2];
      },
      [predictorAction.hand1, predictorAction.hand2]
    );
    const openHand = gameHands.filter(hand => hand === "O").length;
    const isGameEnd = predictorAction.numberOfOpenHand === openHand;
    const winner = isGameEnd ? predictorAction.actor : undefined;
    return {
      predictorAction,
      nonPredictorActions,
      predictValue: predictorAction.numberOfOpenHand,
      isGameEnd: predictorAction.numberOfOpenHand === openHand,
      winner
    };
  }

  async playTurn(turn) {
    console.log("-----------------------------------");
    console.log(`Turn ${turn} start !!!`);
    if (turn !== 1) this.players.push(this.predictor);
    this.predictor = this.players.shift();
    this.nonPredictors = this.players;
    this.predictor.setPredictorStatus("predictor");
    this.nonPredictors.forEach(player =>
      player.setPredictorStatus("non-predictor")
    );
    console.log(`---${this.predictor.name} is a predictor---`);

    let error = false;
    let predictorAction;
    let nonPredictorActions;
    while (!error) {
      try {
        predictorAction = await this.predictor.turnAction();
        error = true;
      } catch (error) {
        console.log(error.message);
        error = false;
      }
    }

    error = false;
    while (!error) {
      try {
        nonPredictorActions = [await this.nonPredictors[0].turnAction()];
        error = true;
      } catch (error) {
        console.log(error.message);
        error = false;
      }
    }

    const summary = this.resultingAction(predictorAction, nonPredictorActions);
    this.draw(summary);

    return summary;
  }

  draw(summary) {
    console.log("!!! This turn !!!");
    console.log(
      `\n${summary.predictorAction.actor}(Predictor): ${summary.predictorAction.hand1}${summary.predictorAction.hand2}${summary.predictorAction.numberOfOpenHand}`
    );
    console.log(
      `${summary.nonPredictorActions[0].actor} : ${summary.nonPredictorActions[0].hand1}${summary.nonPredictorActions[0].hand2}\n\n`
    );
    if (summary.isGameEnd) console.log(`${summary.winner} Win !!!!`);
    else console.log("No Winner ????");
  }

  async startGame() {
    console.log("Welcome to the game!");
    while (true) {
      const turnSummary = await this.playTurn(this.turn);
      if (turnSummary.isGameEnd) break;
      this.turn++;
    }
    console.log("!!!!! Game is end !!!!!");
  }
}
