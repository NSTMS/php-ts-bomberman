import { GameBoard } from "./classes/game_board";
import { start_connection } from "./services/websocket_service";
import { game_settings } from "./data/game_settings";
import { SPRITE_NAMES } from "./enums/sprites_names";
import { preloadImages } from "./classes/loaders/spriteLoader";
import { PlayfieldType } from "./types/playfieldType";
import { Wall } from "./classes/structures/wall";
import { DestructableWall } from "./classes/structures/destructableWall";

const app = document.getElementById("app");
if (!app) throw new Error("app is null");

const HOST = "localhost";
const PORT = 46089;
const PATH = "/php-ts-bomberman/backend/sockets.php";
start_connection(`ws://${HOST}:${PORT}${PATH}`);

const canvasWidth = game_settings.board_width * game_settings.sprite_size_x * game_settings.sprite_scale;
const canvasHeight = game_settings.board_height * game_settings.sprite_size_y * game_settings.sprite_scale;

const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.backgroundColor = game_settings.board_background_color;
app.appendChild(canvas);

const ctx = canvas.getContext('2d');
if (!ctx) throw new Error("2D context not available");

let game: GameBoard;
let lastTime = 0;

const animate = (time: number) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
};


export const startGame = (playfield: PlayfieldType) => {
    const playfieldData = playfield.data;
    if (!playfieldData) return;
    console.log(playfieldData);
    
    const walls = playfieldData.walls.map(pos => new Wall({x: pos.x, y: pos.y}, game_settings.sprite_size_x, game_settings.sprite_size_y));
    const destructableWalls = playfieldData.destructableWalls.map(pos => new DestructableWall({x: pos.x, y: pos.y}, game_settings.sprite_size_x, game_settings.sprite_size_y));
    const ballons_positons = playfieldData.baloons.map(pos => ({x: pos.x, y: pos.y}));

    preloadImages(Object.values(SPRITE_NAMES), () => {
        game = new GameBoard(walls,destructableWalls, ballons_positons);
        requestAnimationFrame(animate);
    });
    
}

