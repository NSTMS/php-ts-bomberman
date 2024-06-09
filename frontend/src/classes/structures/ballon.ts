import { SPRITES_ANIMATION_FRAMES, SPRITE_NAMES } from "../../enums/sprites_names";
import { Position } from "../../types/positionTypes";
import { GameBoard } from "../game_board";
import { Object2D } from "../patterns/Object2D";

export class Baloon extends Object2D {
    position: Position;
    width: number;
    height: number;
    direction: { x: number, y: number }; 
    speed: number; 
    game: GameBoard; 
    sprite_name: SPRITE_NAMES;
    frameIndex: number;
    frameRate: number;
    frameTimer: number;

    constructor(position: { x: number, y: number }, direction: { x: number, y: number }, game: GameBoard) {
        super();
        this.width = game.sprite_size_x;
        this.height = game.sprite_size_y;
        this.position = position;
        this.game = game;
        this.direction = direction;
        this.speed = .002;
        console.log(position, direction);
        
        this.sprite_name = this.direction.x === 1 ? SPRITE_NAMES.BALOON_RIGHT : SPRITE_NAMES.BALOON_LEFT;
        this.frameIndex = 0;
        this.frameRate = 3;
        this.frameTimer = 0;
    }

    update = (deltaTime: number) => {
        const newX = this.position.x + this.direction.x * this.speed * deltaTime;
        const newY = this.position.y + this.direction.y * this.speed * deltaTime;
    
        let collision = false;
    
        for (let obstacle of this.game.obstacles) {
            const obstacleCenter = { x: obstacle.position.x + 0.5, y: obstacle.position.y + 0.5 };
            const balloonCenter = { x: newX + 0.5, y: newY + 0.5 };
            const distance = Math.sqrt(Math.pow(obstacleCenter.x - balloonCenter.x, 2) + Math.pow(obstacleCenter.y - balloonCenter.y, 2));
            const obstacleRadius = 1;
    
            if (distance < obstacleRadius) {
                collision = true;
                break;
            }
        }

        if (!collision) {
            this.position.x = newX;
            this.position.y = newY;
        } else {
            this.direction = { x: -this.direction.x, y: -this.direction.y };
            this.sprite_name = this.direction.x === 1 ? SPRITE_NAMES.BALOON_RIGHT : SPRITE_NAMES.BALOON_LEFT;
        }

      
    
        this.updateAnimation(deltaTime);
    }
    

    updateAnimation(deltaTime: number) {
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
