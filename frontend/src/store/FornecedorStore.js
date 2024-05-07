import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router"
import { NotificacaoStore } from "./NotificacaoStore"
import { ValidarCPF, ValidarCNPJ } from "@/common/util"

export const FornecedorStore = defineStore('fornecedorStore', {
    state: () => ({
        fornecedores: [],
        fornecedor: {},
        btnSalvarValido: true
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`fornecedores`);
                this.fornecedores = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.fornecedores
        },
        async novo() {
            this.fornecedor = {}
            router.push(`/fornecedores/cadastrar`)
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            if(this.fornecedor.telefone==null || this.fornecedor.telefone.length==0) {
                notificacaoStore.exibirNotificacao("Atenção", "o telefone deve ser informado", "warning");
                return
            }
            if(this.fornecedor.email==null || this.fornecedor.email.length==0) {
                notificacaoStore.exibirNotificacao("Atenção", "o email deve ser informado", "warning");
                return
            }
            this.btnSalvarValido = true

            try {
                const request = this.requestBuild()
                const response = await api.post(`fornecedores`, request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo fornecedor", "Fornecedor cadastrado com sucesso", 'success');
                    this.reset()
                    router.push('/fornecedores');  
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar fornecedor: ", error);
            }
        },
        async editar(id) {
            try {
                const request = this.requestBuild()
                const response = await api.put(`fornecedores/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Fornecedor", "Fornecedor atualizado com sucesso", 'success');
                    this.reset()
                    router.push('/fornecedores');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar fornecedor:", error);
            }
            router.push('/fornecedores');
        },
        async cancelar() {
            router.push('/fornecedores')
        },
        async carregarFornecedor(id) {
            try {
                const response = await api.get(`fornecedores/${id}`);
                this.fornecedor = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarFornecedor(id)
            router.push(`/fornecedores/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`fornecedores/${id}`);
                this.fornecedor = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Excluir de fornecedores", `Fornecedor ${this.fornecedor.nome} excluído com sucesso`, `success`);
                router.push(`/fornecedores`);
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        handleDocumento() {
            try {
                const notificacaoStore = NotificacaoStore();
                const { documento } = this.fornecedor;
                const isValid = ValidarCPF(documento) || ValidarCNPJ(documento);
                if(!isValid) {
                    notificacaoStore.exibirNotificacao(isValid ? `Sucesso` : `Erro`, `CPF ou CNPJ inválido`, `warning`);
                    this.btnSalvarValido = false
                    return
                } else {
                    this.btnSalvarValido = true
                }

                if(!this.fornecedor.uuid)
                    this.ValidarDocumentoExiste(documento)

                this.btnSalvarValido = true
            } catch (error) {
                console.error(error.message)
            }
        },
        async ValidarDocumentoExiste(documento) {
            try {
                const response = await api.get(`fornecedores/findByDocumento/${documento}`);
                const notificacaoStore = NotificacaoStore();
                if (response.data) {
                    notificacaoStore.exibirNotificacao(`Erro`, `já existe um fornecedor cadastrado com o CPF/CNPJ ${documento}`, `warning`);
                    this.btnSalvarValido = false
                    return
                }
            } catch (error) {
                console.error(error.message);
            }
        },
        requestBuild() {
            return {...this.fornecedor};
        },
        async validarEmail() {
            const response = await api.get(`fornecedores/findByEmail/${this.fornecedor.email}`);
            if(response.data.length > 0) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao(`Atenção`, response.data, `warning`)
                return
            }
        },
        reset() {
            this.fornecedor = {};
        } 
    },
})