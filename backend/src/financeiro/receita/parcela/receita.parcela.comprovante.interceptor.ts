import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const ReceitaParcelaComprovanteInterceptor = {
  storage: diskStorage({
    destination: './uploads/receitas/comprovantes',
    filename: (req, file, cb) => {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${req.body.receita_uuid}-${req.body.parcela}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Formato de arquivo não suportado. Permitido: pdf, jpg ou png'), false);
    }
  },
  limits: {
    fileSize: 1 * 1000 * 1000, // 1MB
  },
};
