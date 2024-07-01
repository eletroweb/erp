import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsuareioLogado } from 'src/usuario/usuario.logado';

export const EmpresaLogomarcaInterceptor = {
  storage: diskStorage({
    destination: './uploads/empresa/logomarca',
    filename: (req, file, cb) => {
      const usuarioLogado = req.user as UsuareioLogado;
      cb(null, `${usuarioLogado.sub}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (allowedFormats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new BadRequestException(
          'Formato de arquivo não suportado. Permitido: jpg ou png',
        ),
        false,
      );
    }
  },
  limits: {
    fileSize: 1 * 1000 * 1000, // 1MB
  },
};
