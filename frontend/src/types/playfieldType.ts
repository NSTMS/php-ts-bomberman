export type PlayfieldType = {
    data: Playfield;
}

export type Playfield = {
    walls: {x: number, y: number}[];
    destructableWalls: {x: number, y: number}[];
    players: any[]; // Assuming player data structure is not provided
    baloons: {x: number, y: number}[];
}

