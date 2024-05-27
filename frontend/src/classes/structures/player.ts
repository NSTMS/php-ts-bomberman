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
        this.speed = 0.1;
    }

    move(direction: { x: number, y: number }) {
        if (direction.x === 0 && direction.y === 0) return; // No movement

        let newPosition = { 
            x: this.position.x + this.speed * direction.x,
            y: this.position.y + this.speed * direction.y
        };

        // Check for collision with walls and adjust position smoothly
        for (let wall of this.game.walls) {
            const wallCenter = { x: wall.position.x + 0.5, y: wall.position.y + 0.5 };
            const playerCenter = { x: newPosition.x + 0.5, y: newPosition.y + 0.5 };
            const distance = Math.sqrt(Math.pow(wallCenter.x - playerCenter.x, 2) + Math.pow(wallCenter.y - playerCenter.y, 2));
            const playerRadius = 0.5;
            const wallRadius = 0.5;

            if (distance < playerRadius + wallRadius) {
                console.log('Player collided with wall');
                const overlap = playerRadius + wallRadius - distance;

                const directionVector = {
                    x: (playerCenter.x - wallCenter.x) / distance,
                    y: (playerCenter.y - wallCenter.y) / distance
                };

                newPosition.x += directionVector.x * overlap;
                newPosition.y += directionVector.y * overlap;
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
        if (keys.includes('w') || keys.includes('ArrowUp')) direction.y -= 1;
        if (keys.includes('s') || keys.includes('ArrowDown')) direction.y += 1;
        if (keys.includes('a') || keys.includes('ArrowLeft')) direction.x -= 1;
        if (keys.includes('d') || keys.includes('ArrowRight')) direction.x += 1;

        // Normalize direction vector to maintain consistent speed
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        if (magnitude > 0) {
            direction.x /= magnitude;
            direction.y /= magnitude;
        }

        this.move(direction);
    }

    draw = (ctx: CanvasRenderingContext2D) => {
        this.drawSprite(ctx, this.sprite_name, this.position);
    }
}
