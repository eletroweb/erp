import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'authentication'],
        credentials: true,
    },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger('EventGateway');
    private clients: Map<string, string> = new Map();
    private server: Server;

    constructor(
        private jwtService: JwtService
    ) { }

    afterInit(server: Server) {
        this.server = server;
        this.logger.log('Init');
    }

    async getUserUuidFromToken(token: string) {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
        });

        return payload.sub;
    }

    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const token = client.handshake.query.token as string;
            const user = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            this.logger.log(`Client connected: ${client.id} with userId: ${user.sub}`);
            this.clients.set(user.sub, client.id);
        } catch (error) {
            this.logger.log(error.message);
            client.disconnect(); // Desconecta o cliente em caso de erro na verificação do token
        }
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        const userId = [...this.clients.entries()].find(([key, value]) => value === client.id)?.[0];
        if (userId) {
            this.clients.delete(userId);
        }
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        this.logger.log(`Message received: ${data}`);
        return data;
    }

    sendMessageToUser(userId: string, message: string) {
        const clientId = this.clients.get(userId);
        if (clientId) {
            this.server.to(clientId).emit('invoicePending', message);
            this.logger.log(`Message sent to user ${userId} (clientId: ${clientId}): ${message}`);
        } else {
            this.logger.log(`User ${userId} not found`);
        }
    }
}
