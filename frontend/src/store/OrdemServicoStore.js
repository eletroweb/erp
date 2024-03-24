import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import moment from 'moment'

export const useOrdemServicoStore = defineStore('ordemServicoStore', {
    state: () => ({
        ordemServicos: [],
        ordemServico: {
            cliente: {
                uuid: null
            },
            setor: {
                uuid: ""
            }
        }
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`ordemServicos`);
                this.ordemServicos = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async novo() {
            this.reset()
            router.push('/ordemServicos/cadastrar-ordemServicos');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const request = this.requestBuild()
                const response = await api.post("ordemServicos", request);
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Ordem de Serviço", "Ordem de Serviço cadastrada com sucesso", 'success');
                    this.reset()
                    router.push('/ordemServicos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar ordem de serviço:", error);
            }
        },
        async editar(id) {
            try {
                const request = this.requestBuild()
                const response = await api.put(`ordemServicos/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Ordem de Serviço", "Ordem de Serviço atualizada com sucesso", 'success');
                    this.reset()
                    router.push('/ordemServicos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar ordem de serviço:", error);
            }
        },
        async cancelar() {
            router.push('/ordemServicos');
        },
        async carregarOrdemServico(id) {
            try {
                const response = await api.get(`ordemServicos/${id}`);
                this.ordemServico = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarOrdemServico(id)
            router.push(`/ordemServicos/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`ordemServicos/${id}`);
                this.ordemServico = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Ordem de Serviço", `Ordem de Serviço excluida com sucesso`, 'success');
                router.push('/ordemServicos');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        requestBuild() {
            return {
                ...this.ordemServico,
                setor: this.ordemServico.setor.uuid,
                cliente: this.ordemServico.cliente.uuid,
                prazo: moment(this.ordemServico.prazo).format('YYYY-MM-DD')
            };
        },
        reset() {
            this.ordemServico = {
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