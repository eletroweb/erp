import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { ValidarCPF, ValidarCNPJ } from '@/common/util'

export const useClienteStore = defineStore('clienteStore', {
    state: () => ({
        clientes: [],
        cliente: {}
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
            console.log("12361253421534");
            router.push('/clientes/cadastrar-clientes');
        },
        async cadastrar() {
            try {
                const response = await api.post("clientes", this.cliente);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
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
            this.carregarCliente(id)
            router.push(`/clientes/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`clientes/${id}`);
                this.cliente = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Cliente", response.data, 'success');
                router.push('/clientes');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        handleDocumento() {
            const notificacaoStore = NotificacaoStore();
            const { documento } = this.cliente;
            const isValid = ValidarCPF(documento) || ValidarCNPJ(documento);
            if (!isValid)
                notificacaoStore.exibirNotificacao(isValid ? 'Sucesso' : 'Erro', 'CPF ou CNPJ inválido', 'warning');
        }
    },
})