import { defineStore } from "pinia"
import { api } from "@/api/index"
import { NotificacaoStore } from "./NotificacaoStore"
import moment from 'moment'
import { AlertStore } from '@/store/AlertStore'

export const ProjetoAtividadesStore = defineStore('ProjetoAtividadesStore', {
    state: () => ({
        exibirFormulario: false,
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
                const request = this.requestBuild();
                const response = await api.post("projetos-atividades", request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Nova Atividade", "Atividade cadastrada com sucesso", 'success');
                    this.listar(this.projeto)
                    this.reset()
                    this.exibirFormulario = false
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar atividade:", error);
            }
        },
        reset() {
            this.atividade = {
                projeto: null,
                setor: {
                    uuid: ""
                },
                situacao: true,
                data_inicio: null,
                data_fim: null,
                descricao: null,
                observacao: null
            }
        },
        async deletar(uuid) {
            try {
                const response = await api.delete(`projetos-atividades/${uuid}`);
                const alertStore = AlertStore();
                alertStore.show("Atividade excluída com sucesso", "success")
                this.listar(this.projeto)
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        requestBuild() {
            return {
                ...this.atividade,
                setor: this.atividade.setor.uuid,
                projeto: this.atividade.projeto,
                data_inicio: moment(this.atividade.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(this.atividade.data_fim).format('YYYY-MM-DD')
            };
        },
        novo(){
            this.exibirFormulario = true
            this.reset()
        }
    },
})