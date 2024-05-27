
import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, RemoveEvent } from 'typeorm';
import { FinanceiroEntity } from './financeiro.entity';
import { v4 as uuidv4 } from 'uuid';

@EventSubscriber()
export class FinanceiroSubscriber implements EntitySubscriberInterface<FinanceiroEntity> {

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): string | Function {
    return FinanceiroEntity;
  }

  beforeInsert(event: InsertEvent<FinanceiroEntity>) {
    event.entity.uuid = uuidv4();
  }

  beforeRemove(event: RemoveEvent<FinanceiroEntity>): void | Promise<any> {
      // console.log(`Excluindo registro ${event.entity.uuid}`);
  }
}