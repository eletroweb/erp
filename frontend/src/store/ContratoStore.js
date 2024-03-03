import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"

export const ContratoStore = defineStore('contratoStore', {
    state: () => ({
        contratos: [],
        contrato: {}
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`contratos`);
                this.contratos = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.contratos
        },
        async novo() {
            this.contrato = {}
            router.push('/contratos/cadastrar-contrato');
        },
        async cadastrar() {
            try {
                const response = await api.post("contratos", this.contrato);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Novo contrato", "Contrato cadastrado com sucesso", 'success');
                    this.contrato = {}
                    router.push('/contratos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar contrato:", error);
            }
        },
        async editar(id) {
            console.log("Editando", this.contrato);
            try {
                const response = await api.put(`contratos/${id}`, this.contrato);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Contrato", "Contrato editado com sucesso", 'success');
                    this.contrato = {}
                    router.push('/contratos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar contrato:", error);
            }
        },
        async cancelar() {
            /*
            TODO verificar se o formulario esta preenchido e perguntar 
            se o usuário deseja descartar as informações cotnidas no fomrulario
            */
            router.push('/contratos');
        },
        async carregarContrato(id) {
            try {
                const response = await api.get(`contratos/${id}`);
                this.contrato = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarContrato(id)
            router.push(`/contratos/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`contratos/${id}`);
                this.contrato = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Contrato", "Contrato excluido com sucesso", 'success');
                router.push('/contratos');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
})