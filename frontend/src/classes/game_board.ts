import { game_settings } from "../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../enums/sprites_names";
import { InputHandler } from "./handlers/InputHandler";
import { Object2D } from "./patterns/Object2D";
import { Player } from "./structures/player";
import { Wall } from "./structures/wall";

export class GameBoard extends Object2D {
    player: Player;
    scaleXsize: number = game_settings.sprite_size_x * game_settings.sprite_scale;
    boardWidth: number;
    boardHeight: number;
    inputHandler: InputHandler;
    sprite_size_x: number = game_settings.sprite_size_x;
    sprite_size_y: number = game_settings.sprite_size_y;
    walls: Wall[];

    constructor() {
        super();
        this.player = new Player(this);
        this.inputHandler = new InputHandler();
        this.boardWidth = game_settings.board_width - 2;
        this.boardHeight = game_settings.board_height - 2;
        console.log(this.boardWidth, this.boardHeight);
        this.walls = this.createWalls();
    }

    createWalls = (): Wall[] => {
        let walls: Wall[] = [];
        for (let x = 0; x < game_settings.board_width; x++) {
            for (let y = 0; y < game_settings.board_height; y++) {
                if (x === 0 || y === 0 || x === game_settings.board_width - 1 || y === game_settings.board_height - 1 || (x % 2 === 0 && y % 2 === 0)) {
                    walls.push(new Wall({ x: x, y: y }, this.sprite_size_x, this.sprite_size_y));
                }
            }
        }
        return walls;
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.player.draw(ctx);
        for (let wall of this.walls) {
            wall.drawSprite(ctx, SPRITE_NAMES.WALL, wall.position);
        }
    }

    update = () => {
        this.player.update([...this.inputHandler.keysPressed]);
    }
}
