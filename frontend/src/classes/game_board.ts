import { game_settings } from "../data/game_settings";
import { SPRITE_NAMES } from "../enums/sprites_names";
import { InputHandler } from "./handlers/InputHandler";
import { Object2D } from "./patterns/Object2D";
import { Player } from "./structures/player";
import { Wall } from "./structures/wall";
import { Baloon } from "./structures/ballon";
import { DestructableWall } from "./structures/destructableWall";

export class GameBoard extends Object2D {
    player: Player;
    scaleXsize: number = game_settings.sprite_size_x * game_settings.sprite_scale;
    boardWidth: number;
    boardHeight: number;
    inputHandler: InputHandler;
    sprite_size_x: number = game_settings.sprite_size_x;
    sprite_size_y: number = game_settings.sprite_size_y;
    walls: Wall[];
    baloons: Baloon[];
    destructableWalls: DestructableWall[];
    obstacles: Object2D[] = [];

    constructor(walls: Wall[], destructableWalls: DestructableWall[], baloons_pos: {x: number, y: number}[]) {
        super();
        this.player = new Player(this);
        this.inputHandler = new InputHandler();
        this.boardWidth = game_settings.board_width - 2;
        this.boardHeight = game_settings.board_height - 2;
        this.walls = walls;
        this.baloons = baloons_pos.map(pos => new Baloon({x: pos.x, y:pos.y}, this));
        this.destructableWalls = destructableWalls;
        this.obstacles = [...this.walls, ...this.destructableWalls];
    }

    update = (deltaTime: number) => {
        this.player.update([...this.inputHandler.keysPressed], deltaTime);
        for (let balloon of this.baloons) {
            balloon.update(deltaTime);
        }
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.player.draw(ctx);
        for (let wall of this.walls) {
            wall.drawSprite(ctx, SPRITE_NAMES.WALL, wall.position);
        }
        for (let balloon of this.baloons) {
            balloon.draw(ctx);
        }
        for (let dWall of this.destructableWalls) {
            dWall.draw(ctx);
        }
    }  
    
}

