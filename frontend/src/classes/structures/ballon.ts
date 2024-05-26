import { SPRITE_NAMES } from "../enums/sprites_names";
import { Object2D } from "./patterns/Object2D";

export class Ballon extends Object2D{
    position: {x: number, y: number};
    sprite_name: SPRITE_NAMES = SPRITE_NAMES.BALLON;
    speed: number = 1;
    velocity: number = 0.1;
    constructor(){
        super();
        this.position = {x: 1, y: 1};
    }
    
}