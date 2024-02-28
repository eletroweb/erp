import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioResponseDto } from './usuario.response.dto';
import { UsuarioRequestDto } from './usuario.request.dto';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 36 })
  uuid: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'int', default: 1 })
  situacao: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  data_cadastro: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', precision: 0 })
  data_atualizacao: Date;

  @BeforeInsert()
  generateUuid() {
    this.uuid = uuidv4();
  }

  static fromRequestDto(dto: UsuarioRequestDto): UsuarioEntity {
    const entity = new UsuarioEntity();
    entity.nome = dto.nome;
    entity.situacao = dto.situacao || 1;
    return entity;
  }

  toDto(): UsuarioResponseDto {
    return {
      uuid: this.uuid,
      nome: this.nome,
      situacao: this.situacao,
    };
  }
}
