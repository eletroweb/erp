import { Body, Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './public-strategy';
import { BaseUser } from './base-user.dto';
import { SignupRequestDto } from './signup.request.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Realiza autenticação de um usuário existente',
    type: [BaseUser],
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.login(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cadastrar usuário' })
  @ApiResponse({
    status: 200,
    description: 'Cria um novo usuário',
    type: BaseUser,
  })
  async signUp(@Body() request: SignupRequestDto): Promise<string> {
    await this.authService.signup(request);
    return "Usuário cadastrado com sucesso!"
  }
}
