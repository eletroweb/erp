import { EntityRepository, Repository } from 'typeorm';
import { OssEntity } from './oss.entity';

@EntityRepository(OssEntity)
export class OssRepository extends Repository<OssEntity> {
}