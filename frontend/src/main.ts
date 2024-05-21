import { GameBoard } from "./classes/game_board";
import { start_connection } from "./services/websocket_service";
const app = document.getElementById("app");

if (app === null) throw new Error("app is null");
const HOST = "localhost";
const PORT = 46089;
const PATH = "/php-ts-bomberman/backend/sockets.php";
start_connection(`ws://${HOST}:${PORT}${PATH}`)
new GameBoard(app);
