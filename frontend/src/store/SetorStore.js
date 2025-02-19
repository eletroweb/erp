import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { SituacaoEnum } from "@/enum/situacao.enum";

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
                const request = this.requestBuild();
                const response = await api.post("setores", request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 201) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
                    notificacaoStore.exibirNotificacao("Sucesso", "Setor cadastrado", 'sucesso')
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
            try {
                const request = this.requestBuild();
                const response = await api.put(`setores/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Setor", "Edição realizada com sucesso", 'success');
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
            // Perguntar ao usuário se ele realmente deseja cancelar a edição
            if (confirm('Deseja realmente cancelar esta edição?')) {
                router.push('/setores');
            }
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
                notificacaoStore.exibirNotificacao("Setor", "Excluído com sucesso", 'success');
                router.push('/setores');
            } catch (error) {
                console.log(error);
                throw error;
            
                // TODO - Corrigir a mensagem final após deletar o setor, está retornando os dados do DB em forma de mensagem, alterar mensagem na linha 83.
            }
        },
        requestBuild() {
            return {
                ...this.setor,
                situacao: this.setor?.situacao ? SituacaoEnum.ATIVO : SituacaoEnum.INATIVO
            };
        },
    },
})