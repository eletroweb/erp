import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"

export const SetorStore = defineStore('setorStore', {
    state: () => ({
        setores: [],
        setor: {}
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`setores`);
                this.setores = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.setores
        },
        async novo() {
            this.setor = {}
            router.push('/setores/cadastrar-setor');
        },
        async cadastrar() {
            try {
                const response = await api.post("setores", this.setor);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
                    this.setor = {}
                    router.push('/setores');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar setor:", error);
            }
        },
        async editar(id) {
            console.log("Editando", this.setor);
            try {
                const response = await api.put(`setores/${id}`, this.setor);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Setor", response.data, 'success');
                    this.setor = {}
                    router.push('/setores');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar setor:", error);
            }
        },
        async cancelar() {
            /*
            TODO verificar se o formulario esta preenchido e perguntar 
            se o usuário deseja descartar as informações cotnidas no fomrulario
            */
            router.push('/setores');
        },
        async carregarSetor(id) {
            try {
                const response = await api.get(`setores/${id}`);
                this.setor = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarSetor(id)
            router.push(`/setores/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`setores/${id}`);
                this.setor = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Setor", response.data, 'success');
                router.push('/setores');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
})