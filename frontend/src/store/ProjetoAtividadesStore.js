import { defineStore } from "pinia"
import { api } from "@/api/index"
import { NotificacaoStore } from "./NotificacaoStore"

export const ProjetoAtividadesStore = defineStore('ProjetoAtividadesStore', {
    state: () => ({
        setores: [],
        projeto: null,
        atividade: {
            projeto: null,
            setor: {
                uuid: ""
            },
            situacao: true,
            data_inicio: null,
            data_fim: null,
            descricao: null,
            observacao: null
        },
        atividades: [],
        btnSalvarValido: true
    }),
    actions: {
        async listar(projetoUuid) {
            try {
                const response = await api.get(`projetos-atividades/find-by-projeto/${projetoUuid}`);
                this.atividades = response.data;
                return this.atividades
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.post("projetos-atividades", this.atividade);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Nova Atividade", "Atividade cadastrada com sucesso", 'success');
                    this.reset()
                    router.push(`/projetos/${this.projeto}`);
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar atividade:", error);
            }
        },
    },
})