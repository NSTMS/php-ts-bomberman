import { game_settings } from "../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../enums/sprites_names";
import { calc_scaled_sprite_on_canvas_position } from "../services/position_service";
import { Ballon } from "./ballon";
import { Player } from "./player";
import { Object2D } from "./structures/Object2D";
export class GameBoard extends Object2D{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    scaleXsize: number = game_settings.sprite_size * game_settings.sprite_scale;

    constructor(app: HTMLElement) {
        super();
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;
        this.canvas.width = game_settings.board_width * this.scaleXsize;
        this.canvas.height = game_settings.board_height * this.scaleXsize
        this.canvas.style.backgroundColor = game_settings.board_background_color;
        app.appendChild(this.canvas);

        this.drawWalls();

        this.player = new Player(this.ctx);
        this.drawSprite(this.ctx,SPRITE_NAMES.PLAYER_RIGHT, {x: 1, y: 1});
        
        const ballon = new Ballon(this.ctx);
        this.drawSprite(this.ctx,SPRITE_NAMES.BALLON, {x: 20, y: 1});
        ballon.animate();

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            this.playerMove(key);
        });
    }

    drawWalls(){
        for (let x = 0; x < game_settings.board_width; x++) {
            for (let y = 0; y < game_settings.board_height; y++) {
                if(x === 0 || y === 0 || x === game_settings.board_width - 1 || y === game_settings.board_height - 1){
                    this.drawSprite(this.ctx,SPRITE_NAMES.WALL, {x: x, y: y});
                }
                if(x % 2 === 0 && y % 2 === 0){
                    this.drawSprite(this.ctx,SPRITE_NAMES.WALL, {x: x, y: y});
                }
            }
        }
    }

    

    playerMove(direction: string){
        this.clear(this.player.position);
        this.player.move(direction);
        this.drawSprite(this.ctx,this.player.sprite_name, this.player.position);
    }


    clear(pos: { x: number, y: number } = { x: 0, y: 0 }) {
        const canvas_pos = calc_scaled_sprite_on_canvas_position(pos);
        this.ctx.clearRect(canvas_pos.x, canvas_pos.y, this.scaleXsize, this.scaleXsize);
    }
}