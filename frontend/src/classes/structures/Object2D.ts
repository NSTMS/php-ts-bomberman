import { game_settings } from "../../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../../enums/sprites_names";
import { calc_scaled_sprite_on_canvas_position } from "../../services/position_service";

export class Object2D {
    scaleXsize: number = game_settings.sprite_size * game_settings.sprite_scale;


    move(direction: string) {
        // throw new Error("Method not implemented.");
    }

    animate() {
        // throw new Error("Method not implemented.");
        
    }

    drawSprite(ctx:CanvasRenderingContext2D, sprite_name: SPRITE_NAMES, position: { x: number, y: number }) {
        const img = new Image();
        img.src = game_settings.sprite_sheet_path;
        const pos = calc_scaled_sprite_on_canvas_position(position);
        img.onload = () => {
            ctx.drawImage(
                img,
                SPRITES[sprite_name].x,
                SPRITES[sprite_name].y,
                game_settings.sprite_size,
                game_settings.sprite_size,
                pos.x,
                pos.y,
                this.scaleXsize,
                this.scaleXsize
            );
        }
    
    }
}