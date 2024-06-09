import { game_settings } from "../data/game_settings";
import { InputHandler } from "./handlers/InputHandler";
import { Object2D } from "./patterns/Object2D";
import { Player } from "./structures/player";
import { Wall } from "./structures/wall";
import { Baloon } from "./structures/ballon";
import { DestructableWall } from "./structures/destructableWall";

export class GameBoard extends Object2D {
    player: Player;
    boardWidth: number;
    boardHeight: number;
    inputHandler: InputHandler;
    sprite_size_x: number = game_settings.sprite_size_x;
    sprite_size_y: number = game_settings.sprite_size_y;
    baloons: Baloon[];
    obstacles: (DestructableWall | Wall)[];

    constructor(walls: Wall[], destructableWalls: DestructableWall[], baloons_pos: {position: {x: number, y: number}, direction: {x: number, y: number}}[]) {
        super();
        this.player = new Player(this);
        this.inputHandler = new InputHandler();
        this.boardWidth = game_settings.board_width - 2;
        this.boardHeight = game_settings.board_height - 2;
        this.baloons = baloons_pos.map(baloon => new Baloon(baloon.position, baloon.direction, this));
        this.obstacles = [...walls, ...destructableWalls];
    }

    update = (deltaTime: number) => {
        this.player.update([...this.inputHandler.keysPressed], deltaTime);
        for (let balloon of this.baloons) {
            balloon.update(deltaTime);
        }
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.player.draw(ctx);
        for (let wall of this.obstacles) {
            wall.draw(ctx);
        }
        for (let balloon of this.baloons) {
            balloon.draw(ctx);
        }
    }
}
