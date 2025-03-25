import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface Client extends WebSocket {
  id: string;
}

let clients: Client[] = [];

wss.on('connection', (ws: Client) => {
  ws.id = Math.random().toString(36).substring(2, 9);
  clients.push(ws);
  console.log(`Client connected: ${ws.id}`);

  ws.on('message', (data) => {
    const message = data.toString(); // Chuyển Buffer thành string
    console.log(`Received from ${ws.id}: ${message}`);
    broadcast(message, ws.id);
  });

  ws.on('close', () => {
    clients = clients.filter((client) => client.id !== ws.id);
    console.log(`Client disconnected: ${ws.id}`);
  });
});

function broadcast(message: string, senderId: string) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.id !== senderId) {
      client.send(`[${senderId}]: ${message}`);
    }
  });
}

console.log('WebSocket server is running on ws://localhost:8080');