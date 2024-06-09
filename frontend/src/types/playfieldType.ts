export type PlayfieldType = {
    data: Playfield;
}

export type Playfield = {
    walls: {x: number, y: number}[];
    destructableWalls: {x: number, y: number}[];
    players: any[];
    baloons: {
        "direction": {x: number, y: number};
        "position": {x: number, y: number};}[];
}

