import { InputManager } from "./inputManager";
import { Player, Bot } from "./player";
import { Game } from "./game";

async function main() {
  const player = new Player({ name: "Earth" });
  const bot = new Bot({ name: "Coolest AI Forever" });
  let isGameStart = true;
  while (isGameStart)
    try {
      const GameBoard = new Game({ players: [bot, player] });
      await GameBoard.startGame();

      const inputManager = new InputManager();
      const answer = await inputManager.getInputFromKeyboard(
        "Do you want to play again ? (Y\\n)\n"
      );
      if (answer !== "Y") isGameStart = false;
    } catch (error) {
      console.log(error.message);
    }
  console.log("Bye");
}

main();
