import { Player, Bot } from "./player";

describe("Player Module", () => {
  const player = new Player();
  it("should initiates player", () => {
    expect(player).not.toBeNull();
  });

  it("player should make an action", () => {
    const action = player.nonPredictorAction();
    expect(action).not.toBeNull();
  });
  it("player should make an predictor action", () => {
    const action = player.predictorAction();
    expect(action).not.toBeNull();
  });

  it("should be able to initiate AI player", () => {
    const botPlayer = new Bot({ status: "non-predictor" });
    expect(botPlayer).not.toBeNull();
  });

  it("player should make an action", async () => {
    const predictor = new Bot({ status: "predictor" });
    const predictorAction = await predictor.turnAction();
    console.log(predictorAction);
    expect(predictorAction.numberOfOpenHand).not.toBeUndefined();
    expect(predictorAction.hand1).not.toBeUndefined();
    expect(predictorAction.hand2).not.toBeUndefined();
    expect(predictorAction.actor).not.toBeUndefined();
  });

  it("bot should make an action depend on status randomly", async () => {
    const predictor = new Bot({ status: "predictor" });
    const nonPredictor = new Bot({ status: "non-predictor" });
    const predictorAction = await predictor.turnAction();
    const nonPredictorAction = await nonPredictor.turnAction();
    expect(predictorAction.numberOfOpenHand).not.toBeUndefined();
    expect(nonPredictorAction.numberOfOpenHand).toBeUndefined();
  });
});
