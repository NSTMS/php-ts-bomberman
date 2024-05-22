import { SPRITES, SPRITE_NAMES } from "./enums/sprites_names";
import { GameBoard } from "./classes/game_board";
import { game_settings } from "./data/game_settings";
import { start_connection } from "./services/websocket_service";

const app = document.getElementById("app");

if (app === null) throw new Error("app is null");
const HOST = "localhost";
const PORT = 46089;
const PATH = "/php-ts-bomberman/backend/sockets.php";
start_connection(`ws://${HOST}:${PORT}${PATH}`)

const canvasWidth = game_settings.board_width * game_settings.sprite_size_x * game_settings.sprite_scale;
const canvasHeight = game_settings.board_height * game_settings.sprite_size_y * game_settings.sprite_scale;

const canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.backgroundColor = game_settings.board_background_color;
app.appendChild(canvas);

const ctx = canvas.getContext('2d')!;

const game = new GameBoard();

const animate = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update();
    game.draw(ctx);
    requestAnimationFrame(animate);
};

const preloadImages = (spriteNames: SPRITE_NAMES[], callback: () => void) => {
    let loadedImages = 0;
    const totalImages = spriteNames.length;

    const onImageLoad = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
            callback();
        }
    };

    spriteNames.forEach(spriteName => {
        const img = new Image();
        img.src = game_settings.sprite_sheet_path;
        img.onload = onImageLoad;
    });
};


const spriteNames = Object.values(SPRITE_NAMES);
preloadImages(spriteNames, animate); // Preload images before starting the animation
