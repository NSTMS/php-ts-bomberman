import { GameBoard } from "../classes/game_board";
import { startGame } from "../main";

export const start_connection = (url: string) => {
    const ws = new WebSocket(url);
    let gameInitialized = false;
    let gameInstance: GameBoard | undefined = undefined;

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (!gameInitialized) {
            gameInstance = startGame(data);
            gameInitialized = true;
        } else if (data.data.baloons && gameInstance) {
            console.log('update baloons', data.data.baloons);
            gameInstance!.baloons.forEach((balloon, index) => {
                balloon.setTargetPosition(data.data.baloons[index].position);
            });
        }
    };

    ws.onerror = (e) => {
        console.error(e);
    };
};

export const send_message = (ws: WebSocket, message: string) => {
    ws.send(message);
};

export const close_connection = (ws: WebSocket) => {
    ws.close();
};
