import { SPRITE_NAMES } from "../../enums/sprites_names";
import { game_settings } from "../../data/game_settings";
import { GameBoard } from "../game_board";
export const spriteImages: Record<string, HTMLImageElement> = {};

export const preloadImages = (spriteNames: SPRITE_NAMES[], callback: () => void) => {
    let imagesToLoad = spriteNames.length;
    spriteNames.forEach(spriteName => {
        const img = new Image();
        img.src = game_settings.sprite_sheet_path; 
        img.onload = () => {
            spriteImages[spriteName] = img;
            imagesToLoad--;
            if (imagesToLoad === 0) {
                return callback();
            }
        };
    });    
};
