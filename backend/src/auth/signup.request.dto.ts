import { IsNotEmpty } from "class-validator";
import { EmpresaRequestDto } from "src/empresa/empresa.request.dto";
import { UsuarioCreateRequestDto } from "src/usuario/dto/usuario.create.request.dto";

export class SignupRequestDto {
  @IsNotEmpty({ message: 'O usuário é obrigatório.' })
  readonly usuario: UsuarioCreateRequestDto;

  // @IsNotEmpty({ message: 'A empresa é obrigatória.' })
  // readonly empresa: EmpresaRequestDto;
}