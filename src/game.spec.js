import { Player, Bot } from "./player";
import { Game } from "./game";

describe("Game Module", () => {
  it("should init Game successfully", () => {
    const player1 = new Player();
    const player2 = new Player();

    const GameBoard = new Game({ players: [player1, player2] });
    expect(GameBoard).not.toBeNull();
  });
  it("should process turn Game ", async () => {
    const player1 = new Bot();
    const player2 = new Bot();

    const GameBoard = new Game({ players: [player1, player2] });
    const summaryTurn = await GameBoard.playTurn(1);

    expect(Object.keys(summaryTurn)).toEqual([
      "predictorAction",
      "nonPredictorActions",
      "predictValue",
      "isGameEnd",
      "winner"
    ]);
  });
});
