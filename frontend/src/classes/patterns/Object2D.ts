import { game_settings } from "../../data/game_settings";
import { SPRITES, SPRITE_NAMES } from "../../enums/sprites_names";
import { calc_scaled_sprite_on_canvas_position } from "../../services/position_service";

export class Object2D {
    scaleXsize: number = game_settings.sprite_size_x * game_settings.sprite_scale;
    img: HTMLImageElement;

    constructor() {
        this.img = new Image();
        this.img.src = game_settings.sprite_sheet_path;
    }

    drawSprite(ctx: CanvasRenderingContext2D, sprite_name: SPRITE_NAMES, position: { x: number, y: number }) {
        const pos = calc_scaled_sprite_on_canvas_position(position);
        
        if (this.img.complete) {
            ctx.drawImage(
                this.img,
                SPRITES[sprite_name].x,
                SPRITES[sprite_name].y,
                game_settings.sprite_size_x,
                game_settings.sprite_size_y,
                pos.x,
                pos.y,
                this.scaleXsize,
                this.scaleXsize
            );
        } else {
            this.img.onload = () => {
                ctx.drawImage(
                    this.img,
                    SPRITES[sprite_name].x,
                    SPRITES[sprite_name].y,
                    game_settings.sprite_size_x,
                    game_settings.sprite_size_y,
                    pos.x,
                    pos.y,
                    this.scaleXsize,
                    this.scaleXsize
                );
            };
        }
    }
}
