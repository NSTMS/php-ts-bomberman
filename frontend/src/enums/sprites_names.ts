import { calc_sprite_dimensions_on_canvas_position } from "../services/position_service";
import { Position } from "../types/positionTypes";

export enum SPRITE_NAMES {
    WALL = "WALL",
    DESTRUCTABLE_WALL = "DESTRUCTABLE_WALL",
    PLAYER_TOP = "PLAYER_TOP",
    PLAYER_DOWN = "PLAYER_DOWN",
    PLAYER_RIGHT = "PLAYER_RIGHT",
    PLAYER_LEFT = "PLAYER_LEFT",
    PLAIN = "PLAIN",
    BALOON_LEFT = "BALOON_LEFT",
    BALOON_RIGHT = "BALOON_RIGHT"
}

export type SpriteType = {
    [key in SPRITE_NAMES]: Position
}

export const SPRITES : SpriteType= {
    [SPRITE_NAMES.WALL]: { x: 3, y:3  },
    [SPRITE_NAMES.DESTRUCTABLE_WALL]: { x: 4, y: 3 },
    [SPRITE_NAMES.PLAYER_TOP]: { x: 4, y: 1 },
    [SPRITE_NAMES.PLAYER_DOWN]: { x: 4, y: 0 },
    [SPRITE_NAMES.PLAYER_RIGHT]: { x:1 , y: 1 },
    [SPRITE_NAMES.PLAYER_LEFT]: { x: 1, y: 0 },
    [SPRITE_NAMES.PLAIN]: { x: 0, y: 4 },
    [SPRITE_NAMES.BALOON_RIGHT]: { x: 0, y: 15 },
    [SPRITE_NAMES.BALOON_LEFT]: { x: 3, y: 15 },

};

export const SPRITES_ANIMATION_FRAMES: Partial<Record<SPRITE_NAMES, { repeat: boolean; frames: { x: number; y: number }[] }>> = {
    [SPRITE_NAMES.PLAYER_DOWN]: {
        repeat: true,
        frames: [
            { y: 0, x: 3 },
            { y: 0, x: 4 },
            { y: 0, x: 5 },
        ],
    },
    [SPRITE_NAMES.PLAYER_LEFT]: {
        repeat: true,
        frames: [
            { y: 0, x: 0 },
            { y: 0, x: 1 },
            { y: 0, x: 2 },
        ],
    },
    [SPRITE_NAMES.PLAYER_RIGHT]: {
        repeat: true,
        frames: [
            { y: 1, x: 0 },
            { y: 1, x: 1 },
            { y: 1, x: 2 },
        ],
    },
    [SPRITE_NAMES.PLAYER_TOP]: {
        repeat: true,
        frames: [
            { y: 1, x: 3 },
            { y: 1, x: 4 },
            { y: 1, x: 5 },
        ],
    },
    [SPRITE_NAMES.BALOON_RIGHT]: {
        repeat: true,
        frames: [
            { y: 15, x: 0 },
            { y: 15, x: 1 },
            { y: 15, x: 2 },
        ],
    },
    [SPRITE_NAMES.BALOON_LEFT]: {
        repeat: true,
        frames: [
            { y: 15, x: 3 },
            { y: 15, x: 4 },
            { y: 15, x: 5 },
        ],
    },
    [SPRITE_NAMES.PLAIN]: {
        repeat: false,
        frames: [
            { y: 4, x: 0 },
        ],
    },
    [SPRITE_NAMES.WALL]: {
        repeat: true,
        frames: [
            { y: 3, x: 3 },
            { y: 3, x: 4 },
            { y: 3, x: 5 },
            { y: 3, x: 6 },
            { y: 3, x: 7 },
            { y: 3, x: 8 },
        ],
    },
    [SPRITE_NAMES.DESTRUCTABLE_WALL]: {
        repeat: true,
        frames: [
            { y: 3, x: 4 },
        ],
    },
};


for(const sprite in SPRITES){
    const s = sprite as SPRITE_NAMES;
    SPRITES[s] = calc_sprite_dimensions_on_canvas_position(SPRITES[s]);
}
