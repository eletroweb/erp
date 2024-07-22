import { Injectable } from '@nestjs/common';
import { EventGateway } from './events.gateway';
import { UsuarioLogado } from 'src/usuario/dto/usuario.response.dto';
import { NotificaitonRequest } from 'src/app/notification.request';

@Injectable()
export class SocketService {
    constructor(private readonly eventGateway: EventGateway) { }

    emitClientEvent(usuarioLogado: UsuarioLogado, notification: NotificaitonRequest) {
        const userId = usuarioLogado.sub;
        this.eventGateway.sendMessageToUser(userId, notification.content);
    }
}
