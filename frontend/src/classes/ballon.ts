import { SPRITE_NAMES } from "../enums/sprites_names";
import { Object2D } from "./structures/Object2D";

export class Ballon extends Object2D{
    position: {x: number, y: number};
    ctx: CanvasRenderingContext2D;
    sprite_name: SPRITE_NAMES = SPRITE_NAMES.BALLON;
    constructor(c: CanvasRenderingContext2D){
        super();
        this.position = {x: 1, y: 1};
        this.ctx = c;
    }
    move(direction: string){
        switch (direction) {
            case 'w':
                this.position.y -= 1;
                break;
            case 's':
                this.position.y += 1;
                break;
            case 'a':
                this.position.x -= 1;
                break;
            case 'd':
                this.position.x += 1;
                break;
        }
    }
}