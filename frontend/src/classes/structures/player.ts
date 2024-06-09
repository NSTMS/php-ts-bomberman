import { SPRITE_NAMES, SPRITES_ANIMATION_FRAMES } from "../../enums/sprites_names";
import { GameBoard } from "../game_board";
import { Object2D } from "../patterns/Object2D";

export class Player extends Object2D {
    game: GameBoard;
    position: { x: number, y: number };
    sprite_name: SPRITE_NAMES;
    speed: number;
    frameIndex: number;
    frameRate: number;
    frameTimer: number;
    isMoving: boolean;

    constructor(game: GameBoard) {
        super();
        this.game = game;
        this.position = { x: 1, y: 1 };
        this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        this.speed = 0.04;
        this.frameIndex = 0;
        this.frameRate = 10;
        this.frameTimer = 0;
        this.isMoving = false;
    }

    move(direction: { x: number, y: number }) {
        if (direction.x === 0 && direction.y === 0) {
            this.isMoving = false;
            return;
        }

        this.isMoving = true;
        let newPosition = { 
            x: this.position.x + this.speed * direction.x,
            y: this.position.y + this.speed * direction.y
        };

        for (let obstacle of this.game.obstacles) {
            const obstacleCenter = { x: obstacle.position.x + 0.5, y: obstacle.position.y + 0.5 };
            const playerCenter = { x: newPosition.x + 0.5, y: newPosition.y + 0.5 };
            const distance = Math.sqrt(Math.pow(obstacleCenter.x - playerCenter.x, 2) + Math.pow(obstacleCenter.y - playerCenter.y, 2));
            const playerRadius = 0.51;
            const wallRadius = 0.5;

            if (distance < playerRadius + wallRadius) {
                const overlap = playerRadius + wallRadius - distance;

                const directionVector = {
                    x: (playerCenter.x - obstacleCenter.x) / distance,
                    y: (playerCenter.y - obstacleCenter.y) / distance
                };

                newPosition.x += directionVector.x * overlap;
                newPosition.y += directionVector.y * overlap;
            }
        }

        this.position = newPosition;

        if (direction.y < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_TOP;
        } else if (direction.y > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_DOWN;
        } else if (direction.x < 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_LEFT;
        } else if (direction.x > 0) {
            this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
        }
    }

    update = (keys: string[], deltaTime: number) => {
        let direction = { x: 0, y: 0 };
        if (keys.includes('w') || keys.includes('ArrowUp')) direction.y -= 1;
        if (keys.includes('s') || keys.includes('ArrowDown')) direction.y += 1;
        if (keys.includes('a') || keys.includes('ArrowLeft')) direction.x -= 1;
        if (keys.includes('d') || keys.includes('ArrowRight')) direction.x += 1;

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y); // Normalizowanie wektora
        if (magnitude > 0) {
            direction.x /= magnitude;
            direction.y /= magnitude;
        }
        this.move(direction);
        this.updateAnimation(deltaTime);
    }

    updateAnimation(deltaTime: number) {
        if (!this.isMoving) {
            this.frameIndex = 0;
            return;
        }

        this.frameTimer += deltaTime;
        if (this.frameTimer >= 1000 / this.frameRate) {
            this.frameTimer = 0;
            const animationFrames = SPRITES_ANIMATION_FRAMES[this.sprite_name];
            if (animationFrames) {
                this.frameIndex = (this.frameIndex + 1) % animationFrames.frames.length;
            }
        }
    }
    draw = (ctx: CanvasRenderingContext2D) => this.drawSprite(ctx, this.sprite_name, this.position, this.frameIndex);
}
