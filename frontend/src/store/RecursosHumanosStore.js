import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { ValidarCPF } from '@/common/util'

export const RecursosHumanosStore = defineStore('recursosHumanosStore', {
    state: () => ({
        colaboradores: [],
        colaborador: {},
        btnSalvarValido: true,
        pesquisa: {
            nome: null,
            documento: null,
            situacao: null
        }
    }),


    actions: {
        async listar() {
            try {
                const url = await this.getUrlListar();
                const response = await api.get(url);
                this.colaboradores = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.colaboradores
        },
        async getUrlListar() {
            const queryParams = {};
            if (this.pesquisa.nome !== null)
                queryParams.nome = this.pesquisa.nome;

            if (this.pesquisa.documento !== null)
                queryParams.documento = this.pesquisa.documento;

            if (this.pesquisa.situacao !== null)
                queryParams.situacao = this.pesquisa.situacao;

            const queryString = new URLSearchParams(queryParams).toString();
            const url = `colaboradores?${queryString}`;
            return url
        },
        async novo() {
            this.colaborador = {}
            router.push(`/rh/colaborador/cadastrar`);
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();

            if (this.colaborador.nome == null || this.colaborador.nome.length == 0) {
                notificacaoStore.exibirNotificacao("Atenção", "O nome deve ser informado", 'warning');
                return
                
            }

            if (this.colaborador.documento == null || this.colaborador.documento.length == 0) {
                notificacaoStore.exibirNotificacao("Atenção", "O CPF deve ser informado", 'warning');
                return

            }

            if (this.colaborador.telefone == null || this.colaborador.telefone.length == 0) {
                notificacaoStore.exibirNotificacao("Atenção", "O telefone deve ser informado", 'warning');
                return

            }
            if (this.colaborador.cargo == null || this.colaborador.cargo.length == 0) {
                notificacaoStore.exibirNotificacao("Atenção", "O cargo deve ser informado", 'warning');
                return
            }

            this.btnSalvarValido = true

            try {
                const request = this.requestBuild()
                const response = await api.post(`colaboradores`, request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo colaborador", "colaborador cadastrado com sucesso", 'success');
                    this.reset()
                    router.push('/rh');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar colaborador:", error);
            }
        },
        async editar(id) {
            try {
                const request = this.requestBuild()
                const response = await api.put(`colaboradores/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("colaborador", "colaborador atualizado com sucesso", 'success');
                    this.reset()
                    router.push('/rh');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar colaborador:", error);
            }
            isDocumentoValido: true,

                router.push('/rh')
        },
        async cancelar() {
            /*
            TODO verificar se o formulario esta preenchido e perguntar 
            se o usuário deseja descartar as informações cotnidas no fomrulario
            */
            router.push('/rh');
        },
        async carregarcolaborador(id) {
            try {
                const response = await api.get(`colaboradores/${id}`);
                this.colaborador = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarcolaborador(id)
            router.push(`rh/colaborador/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`colaboradores/${id}`);
                this.colaborador = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Excluir de colaborador", `colaborador ${this.colaborador.nome} excluído com sucesso`, 'success');
                router.push('/colaborador');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        handleDocumento() {
            try {
                const notificacaoStore = NotificacaoStore();
                const { documento } = this.colaborador;
                const isValid = ValidarCPF(documento);
                if (!isValid) {
                    notificacaoStore.exibirNotificacao(isValid ? 'Sucesso' : 'Erro', 'CPF inválido', 'warning');
                    this.btnSalvarValido = false
                    return

                }
                if (!this.colaborador.uuid)
                    this.ValidarDocumentoExiste(documento)

                this.btnSalvarValido = true
            } catch (error) {
                console.log(error.message);
            }
        },
        async ValidarDocumentoExiste(documento) {
            try {
                const response = await api.get(`colaboradores/findByDocumento/${documento}`);
                const notificacaoStore = NotificacaoStore();
                if (response.data) {
                    notificacaoStore.exibirNotificacao('Erro', `Já existe um colaborador cadastrado com o CPF/CNPJ ${documento}`, 'warning');
                    this.btnSalvarValido = false
                    return
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        requestBuild() {
            return { ...this.colaborador };
        },

        async validarEmail() {
            const response = await api.get(`colaboradores/findByEmail/${this.colaborador.email}`)
            if (response.data.length > 0) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao('Atenção', response.data, 'warning');
                this.btnSalvarValido = false
                return
            }
        },
        reset() {
            this.colaborador = {};
        }
    },
})