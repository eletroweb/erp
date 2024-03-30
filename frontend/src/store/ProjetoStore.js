import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import { ValidarCPF, ValidarCNPJ } from '@/common/util'
import moment from 'moment'

export const useProjetoStore = defineStore('projetoStore', {
    state: () => ({
        projetos: [],
        projeto: {
            cliente: {
                uuid: null
            },
            setor: {
                uuid: ""
            },
        },
        btnSalvarValido: true
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`projetos`);
                this.projetos = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async novo() {
            this.reset()
            router.push('/projetos/cadastrar-projetos');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const request = this.requestBuild()
                const response = await api.post("projetos", request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo projeto", "Projeto cadastrado com sucesso", 'success');
                    this.reset()
                    router.push('/projetos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar projeto:", error);
            }
        },
        async editar(id) {
            try {
                const request = this.requestBuild()
                const response = await api.put(`projetos/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Projeto", "Projeto atualizado com sucesso", 'success');
                    this.reset()
                    router.push('/projetos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar projeto:", error);
            }
        },
        async cancelar() {
            router.push('/projetos');
        },
        async carregarProjeto(id) {
            try {
                const response = await api.get(`projetos/${id}`);
                this.projeto = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarProjeto(id)
            router.push(`/projetos/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`projetos/${id}`);
                this.projeto = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Excluir de projeto", `Projeto ${this.projeto.nome} excluído com sucesso`, 'success');
                router.push('/projetos');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        handleDocumento() {
            try {
                const notificacaoStore = NotificacaoStore();
                const { documento } = this.projeto;
                const isValid = ValidarCPF(documento) || ValidarCNPJ(documento);
                if (!isValid) {
                    notificacaoStore.exibirNotificacao(isValid ? 'Sucesso' : 'Erro', 'CPF ou CNPJ inválido', 'warning');
                    this.btnSalvarValido = false
                    return
                } else {
                    this.btnSalvarValido = true
                }

                if (!this.projeto.uuid)
                    this.ValidarDocumentoExiste(documento)

                this.btnSalvarValido = true
            } catch (error) {
                console.log(error.message);
            }
        },
        async ValidarDocumentoExiste(documento) {
            try {
                const response = await api.get(`projetos/findByDocumento/${documento}`);
                const notificacaoStore = NotificacaoStore();
                if (response.data) {
                    notificacaoStore.exibirNotificacao('Erro', `Já existe um projeto cadastrado com o CPF/CNPJ ${documento}`, 'warning');
                    this.btnSalvarValido = false
                    return
                } 
            } catch (error) {
                console.log(error.message);
            }
        },
        requestBuild() {
            return {
                ...this.projeto,
                setor: this.projeto.setor.uuid,
                cliente: this.projeto.cliente.uuid,
                data_inicio: moment(this.projeto.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(this.projeto.data_fim).format('YYYY-MM-DD')
            };
        },
        async validarEmail(){
            const response = await api.get(`projetos/findByEmail/${this.projeto.email}`)
            if (response.data.length > 0) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao('Atenção', response.data, 'warning');
                this.btnSalvarValido = false
                return
            }
        },
        reset() {
            this.projeto = {
                cliente: {
                    uuid: null
                },
                setor: {
                    uuid: ""
                },
            }
        }
    },
})