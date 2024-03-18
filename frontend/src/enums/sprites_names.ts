import { calc_sprite_on_canvas_position } from "../services/position_service";
import { Position } from "../types/positionTypes";

export enum SPRITE_NAMES {
    WALL = "WALL",
    DESTRUCTABLE_WALL = "DESTRUCTABLE_WALL",
    PLAYER = "PLAYER",
    PLAIN = "PLAIN",
}

export type SpriteType = {
        [key in SPRITE_NAMES]: Position
}

export const SPRITES : SpriteType= {
    [SPRITE_NAMES.WALL]: { x: 3, y: 3 },
    [SPRITE_NAMES.DESTRUCTABLE_WALL]: { x: 4, y: 3 },
    [SPRITE_NAMES.PLAYER]: { x: 0, y: 0 },
    [SPRITE_NAMES.PLAIN]: { x: 0, y: 4 },
};

for(const sprite in SPRITES){
    const s = sprite as SPRITE_NAMES;
    SPRITES[s] = calc_sprite_on_canvas_position(SPRITES[s]);
}
