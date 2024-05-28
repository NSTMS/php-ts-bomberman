import { startGame } from "../main";

export const start_connection = (url: string) => {
    const ws = new WebSocket(url);
    ws.onmessage = (e) => {
        if(e.data == "") return;
        startGame(JSON.parse(e.data));
    }
    ws.onerror = (e) => {
        console.error(e);
    }
}
export const send_message = (ws: WebSocket, message: string) => {
    ws.send(message);
}
export const close_connection = (ws: WebSocket) => {
    ws.close();
}
