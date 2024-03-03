import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { ValidarCPF, ValidarCNPJ } from '@/common/util'

export const useClienteStore = defineStore('clienteStore', {
    state: () => ({
        clientes: [],
        cliente: {
            setor: {
                uuid: null
            }
        },
        btnSalvarValido: true
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`clientes`);
                this.clientes = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async novo() {
            this.cliente = {}
            router.push('/clientes/cadastrar-clientes');
        },
        async cadastrar() {
            try {
                const response = await api.post("clientes", this.cliente);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo cliente", "Cliente cadastrado com sucesso", 'success');
                    this.cliente = {}
                    router.push('/clientes');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
            }
        },
        async editar(id) {
            console.log("Editando", this.cliente);
            try {
                const response = await api.put(`clientes/${id}`, this.cliente);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Cliente", response.data, 'success');
                    this.cliente = {}
                    router.push('/clientes');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar cliente:", error);
            }
        },
        async cancelar() {
            /*
            TODO verificar se o formulario esta preenchido e perguntar 
            se o usuário deseja descartar as informações cotnidas no fomrulario
            */
            router.push('/clientes');
        },
        async carregarCliente(id) {
            try {
                const response = await api.get(`clientes/${id}`);
                this.cliente = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.cliente.setor = this.cliente.setor.uuid
            console.log(this.cliente.setor);
            this.carregarCliente(id)
            router.push(`/clientes/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`clientes/${id}`);
                this.cliente = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Excluir de cliente", `Cliente ${this.cliente.nome} excluído com sucesso`, 'success');
                router.push('/clientes');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        handleDocumento() {
            try {
                const notificacaoStore = NotificacaoStore();
                const { documento } = this.cliente;
                const isValid = ValidarCPF(documento) || ValidarCNPJ(documento);
                if (!isValid) {
                    notificacaoStore.exibirNotificacao(isValid ? 'Sucesso' : 'Erro', 'CPF ou CNPJ inválido', 'warning');
                    this.btnSalvarValido = false
                    return
                } else {
                    this.btnSalvarValido = true
                }

                if (!this.cliente.uuid)
                    this.ValidarDocumentoExiste(documento)

                this.btnSalvarValido = true
            } catch (error) {
                console.log(error.message);
            }
        },
        async ValidarDocumentoExiste(documento) {
            try {
                const response = await api.get(`clientes/findByDocumento/${documento}`);
                const notificacaoStore = NotificacaoStore();
                if (response.data) {
                    notificacaoStore.exibirNotificacao('Erro', `Já existe um cliente cadastrado com o CPF/CNPJ ${documento}`, 'warning');
                    this.btnSalvarValido = false
                    return
                } 
            } catch (error) {
                console.log(error.message);
            }
        },
        async validarEmail(){
            const response = await api.get(`clientes/findByEmail/${this.cliente.email}`)
            if (response.data.length > 0) {
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao('Atenção', response.data, 'warning');
                this.btnSalvarValido = false
                return
            }
        }
    },
})