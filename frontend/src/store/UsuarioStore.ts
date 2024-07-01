import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { ModuloStore } from './configuracao/ModuloStore'

export const UsuarioStore = defineStore('usuarioStore', {
    state: () => ({
        usuarios: [],
        usuario: {
            roles: []
        },
        cargosDisponiveis: [],
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get('usuarios');
                this.usuarios = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.usuarios
        },
        async carregar(uuid: string) {
            try {
                const response = await api.get(`usuarios/${uuid}`);
                this.usuario = response.data;
                const moduloStore = ModuloStore();
                moduloStore.roles = this.usuario.roles;
                // TODO revisar isso
                const cargosResponse = await api.get(`cargos/`)
                this.cargosDisponiveis = cargosResponse.data;

            } catch (error) {
                // TODO usar o compoennte notification para exibir na tela caso ocorra algum erro no carregmaento do usuário
                console.log(error);
                throw error;
            }
        },
        async cencelar() {
            router.push(`/usuarios/`);
        },
        async exibir(uuid: string) {
            router.push(`/usuarios/${uuid}`);
        },
        async novo() {
            this.usuario = {}
            router.push(`/usuarios/cadastrar`);
        },
        async editar() {
            try {
                const request = this.requestBuild()
                const response = await api.put(`usuarios/${this.usuario.uuid}`, request);
                console.log(response);
                this.reset()
                router.push('/usuarios');
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
            }
        },
        async salvar() {
            const request = this.requestBuild();
            try {
                const response = await api.post(`usuarios/`, request);
                console.log(response);
                this.reset()
                router.push('/usuarios');
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
            }
        },
        requestBuild() {
            const moduloStore = ModuloStore();
            return {
                ...this.usuario,
                username: this.usuario.email,
                roles: moduloStore.getRolesSelecionadas
            };
        },
        reset() {
            this.usuario = {
                roles: []
            }
        }
    },
})