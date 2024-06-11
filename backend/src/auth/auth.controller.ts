/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "./public-strategy";
import { UsuarioRequestDto } from "src/auth/usuarios/usuario.request.dto";
import { BaseUser } from "./base-user.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {

    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    @ApiOperation({ summary: "Autenticar usuário" })
    @ApiResponse({
        status: 200,
        description: "Realiza autenticação de um usuário existente",
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
    signUp(@Body() request: UsuarioRequestDto) {
        return this.authService.cadastro(request);
    }
}