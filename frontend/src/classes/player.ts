import { SPRITE_NAMES } from "../enums/sprites_names";

export class Player{
    position: {x: number, y: number};
    ctx: CanvasRenderingContext2D;
    sprite_name: SPRITE_NAMES = SPRITE_NAMES.PLAYER_RIGHT;
    constructor(c: CanvasRenderingContext2D){
        this.position = {x: 1, y: 1};
        this.ctx = c;
    }
    move(direction: string){
        switch (direction) {
            case 'w':
                this.sprite_name = SPRITE_NAMES.PLAYER_TOP;
                this.position.y -= 1;
                break;
            case 's':
                this.sprite_name = SPRITE_NAMES.PLAYER_DOWN;
                this.position.y += 1;
                break;
            case 'a':
                this.sprite_name = SPRITE_NAMES.PLAYER_LEFT;
                this.position.x -= 1;
                break;
            case 'd':
                this.sprite_name = SPRITE_NAMES.PLAYER_RIGHT;
                this.position.x += 1;
                break;
        }
    }
    animate(){
        
    }

}