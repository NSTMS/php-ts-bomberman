export class InputHandler {
    keysPressed: Set<string>; // Używamy Set zamiast tablicy

    constructor() {
        this.keysPressed = new Set<string>();
        const keys = new Set(['w', 'a', 's', 'd', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']);
        
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if (keys.has(e.key)) { 
                this.keysPressed.add(e.key);
            }
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            if (keys.has(e.key)) {
                this.keysPressed.delete(e.key);
            }
        });    
    }
}
