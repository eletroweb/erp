import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"

export const useSetorStore = defineStore('setorStore', {
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
        },
        async cadastrar() {
            try {
                const response = await api.post("setores", this.setor);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
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
    },
})