import { SPRITE_NAMES } from "../../enums/sprites_names";
import { GameBoard } from "../game_board";
import { Object2D } from "../patterns/Object2D";

export class Player extends Object2D {
    game: GameBoard;
    position: { x: number, y: number };
    sprite_name: SPRITE_NAMES;
    speed: number;

    constructor(game: GameBoard) {
        super();
        this.game = game;
        this.position = { x: 1, y: 1 };
        this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        this.speed = 1;
    }

    move(direction: { x: number, y: number }) {
        if (direction.x === 0 && direction.y === 0) return; // No movement

        let newPosition = { 
            x: this.position.x + this.speed * direction.x,
            y: this.position.y + this.speed * direction.y
        };

        // Round to ensure alignment with the grid
        newPosition.x = newPosition.x;
        newPosition.y = newPosition.y;

        // Apply constraints to ensure the new position is within bounds
        newPosition.x = Math.max(1, Math.min(newPosition.x, this.game.boardWidth));
        newPosition.y = Math.max(1, Math.min(newPosition.y, this.game.boardHeight));

        // Check for collision with walls
        for (let wall of this.game.walls) {
            if (Math.round(newPosition.x) === wall.position.x && Math.round(newPosition.y) === wall.position.y) {
                console.log('Player collided with wall');
                return; // If there's a collision, stop the movement
            }
        }

        this.position = newPosition;

        // Update sprite direction
        if (direction.y < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_TOP;
        } else if (direction.y > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_DOWN;
        } else if (direction.x < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_LEFT;
        } else if (direction.x > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        }

        console.log(this.position);
    }

    update = (keys: string[]) => {
        let direction = { x: 0, y: 0 };
        if (keys.includes('w') || keys.includes('ArrowUp')) direction.y -= this.speed;
        if (keys.includes('s') || keys.includes('ArrowDown')) direction.y += this.speed;
        if (keys.includes('a') || keys.includes('ArrowLeft')) direction.x -= this.speed;
        if (keys.includes('d') || keys.includes('ArrowRight')) direction.x += this.speed;

        this.move(direction);
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.drawSprite(ctx, this.sprite_name, this.position);
    }
}
