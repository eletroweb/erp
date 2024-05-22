import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { existsSync, createReadStream } from 'fs';

@Injectable()
export class ReceitaParcelaComprovanteService {
  private basePath = './uploads/receitas/comprovantes';

  getFilePath(filename: string): string {
    const filePath = join(this.basePath, filename);
    if (!existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado');
    }
    return filePath;
  }

  getFileStream(filename: string) {
    const filePath = this.getFilePath(filename);
    return createReadStream(filePath);
  }
}
