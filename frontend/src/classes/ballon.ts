import { SPRITE_NAMES } from "../enums/sprites_names";
import { Object2D } from "./structures/Object2D";

export class Ballon extends Object2D{
    position: {x: number, y: number};
    ctx: CanvasRenderingContext2D;
    sprite_name: SPRITE_NAMES = SPRITE_NAMES.BALLON;
    speed: number = 1;
    velocity: number = 0.1;
    constructor(c: CanvasRenderingContext2D){
        super();
        this.position = {x: 1, y: 1};
        this.ctx = c;
    }
    move(direction: string){
        switch (direction) {
            case 'w':
                this.position.y -= this.speed * this.velocity; 
                break;
            case 's':
                this.position.y += this.speed * this.velocity;
                break;
            case 'a':
                this.position.x -= this.speed * this.velocity;
                break;
            case 'd':
                this.position.x += this.speed * this.velocity; 
                break;
        }
    }
}