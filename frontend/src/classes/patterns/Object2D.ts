import { game_settings } from "../../data/game_settings";
import { SPRITES, SPRITE_NAMES, SPRITES_ANIMATION_FRAMES } from "../../enums/sprites_names";
import { calc_scaled_sprite_on_canvas_position } from "../../services/position_service";
import { Position } from "../../types/positionTypes";
import { spriteImages } from "../loaders/spriteLoader";
export class Object2D {
    scaleXsize: number = game_settings.sprite_size_x * game_settings.sprite_scale;
    position: Position = { x: 0, y: 0 };

    drawSprite(ctx: CanvasRenderingContext2D, sprite_name: SPRITE_NAMES, position: { x: number, y: number }, frameIndex: number = 0) {
        const pos = calc_scaled_sprite_on_canvas_position(position);
        const spriteFrames = SPRITES_ANIMATION_FRAMES[sprite_name]?.frames;
        const spriteFrame = spriteFrames ? spriteFrames[frameIndex % spriteFrames.length] : SPRITES[sprite_name];

        const img = spriteImages[sprite_name];
        if (img) {
            ctx.drawImage(
                img,
                spriteFrame.x * game_settings.sprite_size_x,
                spriteFrame.y * game_settings.sprite_size_y,
                game_settings.sprite_size_x,
                game_settings.sprite_size_y,
                pos.x,
                pos.y,
                this.scaleXsize,
                this.scaleXsize
            );
        }
    }
}
