import { GameBoard } from "./classes/game_board";
const app = document.getElementById('app');

if(app === null) throw new Error("app is null");

new GameBoard(app);





