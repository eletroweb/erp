import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { FinanceiroEntity } from 'src/financeiro/financeiro.entity';
import { SocketService } from 'src/financeiro/socket.service';
import { Repository } from 'typeorm';

@Injectable()
export class InvoicePendingCron {
    private readonly logger = new Logger(InvoicePendingCron.name);

    constructor(
        @InjectRepository(FinanceiroEntity)
        private readonly financeiroRepository: Repository<FinanceiroEntity>,
        private readonly socketService: SocketService,
    ) { }

    //@Cron(CronExpression.EVERY_5_SECONDS)
    async handleCron() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 5);

        const financeirosPendentes = await this.financeiroRepository.createQueryBuilder('financeiro')
            .where('financeiro.data_vencimento <= :currentDate', { currentDate })
            .andWhere('financeiro.situacao IN (:...situacoes)', { situacoes: ['PENDENTE', 'VENCIDA'] })
            .andWhere('financeiro.categoria = :categoria', { categoria: 'DESPESA' })
            .orderBy('financeiro.data_vencimento', 'ASC')
            .getMany();

        console.log(financeirosPendentes);
        //this.socketService.emitClientEvent('Oi');
        this.logger.debug('Registros financeiros pendentes de pagamento, nos proximos 5 segundos');
    }
}