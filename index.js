import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import express from "express";

const port = 3000;
const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws, req) => {
  console.log("server cnnectd successfully");

  ws.on("open", () => {
    ws.send("Chalu h re");
  });

  ws.on("message", function response(message) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        
        client.send(message);
      }
    });
  });
});

server.listen(port);
