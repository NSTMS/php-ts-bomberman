import { game_settings } from "../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../enums/sprites_names";
export class GameBoard {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(app: HTMLElement) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        this.canvas.width = game_settings.board_width * game_settings.sprite_size * game_settings.sprite_scale;
        this.canvas.height = game_settings.board_height * game_settings.sprite_size * game_settings.sprite_scale;
        this.canvas.style.backgroundColor = game_settings.board_background_color;
        app.appendChild(this.canvas);
        this.drawWalls();

    }

    drawWalls(){
        for (let x = 0; x < game_settings.board_width; x++) {
            for (let y = 0; y < game_settings.board_height; y++) {
                if(x === 0 || y === 0 || x === game_settings.board_width - 1 || y === game_settings.board_height - 1){
                    this.drawSprite(SPRITE_NAMES.WALL, {x: x, y: y});
                }
            }
        }
    }

    drawSprite(sprite_name: SPRITE_NAMES, position: { x: number, y: number }) {
        const img = new Image();
        img.src = game_settings.sprite_sheet_path;
        img.onload = () => {
            this.ctx.drawImage(
                img,
                SPRITES[sprite_name].x,
                SPRITES[sprite_name].y,
                game_settings.sprite_size,
                game_settings.sprite_size,
                position.x * game_settings.sprite_size * game_settings.sprite_scale,
                position.y * game_settings.sprite_size * game_settings.sprite_scale,
                game_settings.sprite_size * game_settings.sprite_scale,
                game_settings.sprite_size * game_settings.sprite_scale
            );
        }
        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}