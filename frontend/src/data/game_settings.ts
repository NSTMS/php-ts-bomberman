const sprite_sheets_axis = {
    "x": 224,
    "y": 383
} as const;

export const game_settings = {
    "board_width": 31,
    "board_height": 13,
    "sprite_size_x": sprite_sheets_axis.x / 14,
    "sprite_size_y": sprite_sheets_axis.y / 24,
    "sprite_scale": 2,
    "board_background_color": '#388700',
    "sprite_sheet_path": "src/assets/sprites.png",
} as const;