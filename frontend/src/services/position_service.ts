import { game_settings } from "../data/game_settings"
import { Position } from "../types/positionTypes"

export const calc_sprite_dimensions_on_canvas_position = (pos: Position) => {
    return {
        x: pos.x * game_settings.sprite_size_x,
        y: pos.y * game_settings.sprite_size_y
    }
}


export const calc_scaled_sprite_on_canvas_position = (pos: Position) => {
    return {
        x: pos.x * game_settings.sprite_size_x * game_settings.sprite_scale,
        y: pos.y * game_settings.sprite_size_y * game_settings.sprite_scale
    }
}
