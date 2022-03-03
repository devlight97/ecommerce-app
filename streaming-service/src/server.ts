import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';

export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private io: SocketIOServer;

  private activeSockets: string[] = [];

  private readonly DEFAULT_PORT = 5000;

  constructor() {
    this.initialize();

    this.handleRoutes();
    this.handleSocketConnection();
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT)
    );
  }

  private initialize(): void {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new SocketIOServer(this.httpServer);

    this.configureApp();
  }

  private handleRoutes(): void {
    this.app.get('/', (req, res) => {
      res.render('index');
    });
  }

  private handleSocketConnection(): void {
    this.io.on('connection', (socket) => {
      const existingSocket = this.activeSockets.find(
        existingSocketId => existingSocketId === socket.id
      );
      if (!existingSocket) {
        this.activeSockets.push(socket.id);

        socket.emit('update-user-list', {
          users: this.activeSockets.filter(
            existingSocketId => existingSocketId !== socket.id
          ),
        });

        socket.broadcast.emit('update-user-list', {
          users: [socket.id],
        });

        socket.on('call-user', (data) => {
          socket.to(data.to).emit('call-made', {
            offer: data.offer,
            socket: socket.id,
          });
        });

        socket.on('make-answer', (data) => {
          socket.to(data.to).emit('answer-made', {
            answer: data.answer,
            socket: socket.id,
          });
        });

        socket.on('disconnect', () => {
          this.activeSockets = this.activeSockets.filter(
            existingSocketId => existingSocketId !== socket.id
          );
          socket.broadcast.emit('remove-user', {
            socketId: socket.id,
          });
        });
      }
    });
  }

  private configureApp(): void {
    this.app.use(express.static(path.join(__dirname, './../public')));
  }
}
