import { SPRITE_NAMES } from "../enums/sprites_names";
import { GameBoard } from "./game_board";
import { Object2D } from "./structures/Object2D";

export class Player extends Object2D {
    game: GameBoard;
    position: { x: number, y: number };
    sprite_name: SPRITE_NAMES;
    speed: number;
    velocity: number;

    constructor(game: GameBoard) {
        super();
        this.game = game;
        this.position = { x: 1, y: 1 };
        this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        this.speed = 1;
        this.velocity = 0.04;
    }

    move(direction: { x: number, y: number }) {
        if (direction.x === 0 && direction.y === 0) return; // No movement

        if (direction.y < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_TOP;
        } else if (direction.y > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_DOWN;
        } else if (direction.x < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_LEFT;
        } else if (direction.x > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        }

        this.position.x += this.speed * this.velocity * direction.x;
        this.position.y += this.speed * this.velocity * direction.y;

        console.log(this.position);
    }

    update = (keys: string[]) => {
        let direction = { x: 0, y: 0 };

        if (keys.includes('w') || keys.includes('ArrowUp')) direction.y -= 1;
        if (keys.includes('s') || keys.includes('ArrowDown')) direction.y += 1;
        if (keys.includes('a') || keys.includes('ArrowLeft')) direction.x -= 1;
        if (keys.includes('d') || keys.includes('ArrowRight')) direction.x += 1;

        this.move(direction);
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.drawSprite(ctx, this.sprite_name, this.position);
    }
}
