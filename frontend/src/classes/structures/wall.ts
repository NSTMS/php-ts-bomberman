import { SPRITE_NAMES } from "../../enums/sprites_names";
import { Position } from "../../types/positionTypes";
import { Object2D } from "../patterns/Object2D";

export class Wall extends Object2D{
    position: Position;
    width: number;
    height: number;
    constructor(position: {x: number, y: number}, width: number, height: number){
        super();
        this.width = width;
        this.height = height;
        this.position = position;
    }
    draw = (ctx: CanvasRenderingContext2D) => this.drawSprite(ctx, SPRITE_NAMES.WALL, this.position);
}
