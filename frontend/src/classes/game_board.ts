import { game_settings } from "../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../enums/sprites_names";
import { InputHandler } from "./handlers/InputHandler";
import { Player } from "./player";
import { Object2D } from "./structures/Object2D";
export class GameBoard extends Object2D{
    player: Player;
    scaleXsize: number = game_settings.sprite_size_x * game_settings.sprite_scale;
    inputHandler: InputHandler;
    constructor() {
        super();
        this.player = new Player(this);
        this.inputHandler = new InputHandler();
        // const ballon = new Ballon();
    }
    
    draw = (ctx: CanvasRenderingContext2D) => {

        this.player.draw(ctx);
        for (let x = 0; x < game_settings.board_width; x++) {
            for (let y = 0; y < game_settings.board_height; y++) {
                if(x === 0 || y === 0 || x === game_settings.board_width - 1 || y === game_settings.board_height - 1){
                    this.drawSprite(ctx,SPRITE_NAMES.WALL, {x: x, y: y});
                }
                if(x % 2 === 0 && y % 2 === 0){
                    this.drawSprite(ctx,SPRITE_NAMES.WALL, {x: x, y: y});
                }
            }
        }
    }

    update = () => {
        this.player.update(this.inputHandler.keysPressed);
    }
}
