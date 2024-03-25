import { game_settings } from "../data/game_settings"
import { Position } from "../types/positionTypes"

export const calc_sprite_on_canvas_position = (pos: Position) => {
    return {
        x: pos.x * game_settings.sprite_size,
        y: pos.y * game_settings.sprite_size
    }
}


export const calc_scaled_sprite_on_canvas_position = (pos: Position) => {
    return {
        x: pos.x * game_settings.sprite_size * game_settings.sprite_scale,
        y: pos.y * game_settings.sprite_size * game_settings.sprite_scale
    }
}
