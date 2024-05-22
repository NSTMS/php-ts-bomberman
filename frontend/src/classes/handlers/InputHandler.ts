export class InputHandler {
    keysPressed: string[] = []; 
    constructor() {
        const keys = ['w', 'a', 's', 'd', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (keys.includes(e.key) && this.keysPressed.indexOf(e.key) === -1) { 
                this.keysPressed.push(e.key);
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (keys.includes(e.key) && this.keysPressed.indexOf(e.key) !== -1) {
                this.keysPressed.splice(this.keysPressed.indexOf(e.key), 1);
            }
        });    
    }
}
