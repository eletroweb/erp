import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"

export const useServicoStore = defineStore('servicoStore', {
    state: () => ({
        servicos: [],
        servico: {
            setor: {
                uuid: ""
            },
            contrato: {
                uuid: ""
            }
        }
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`servicos`);
                this.servicos = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async novo() {
            this.servico = this.reset();
            console.log("12361253421534");
            router.push('/servicos/cadastrar-servicos');
        },
        async cadastrar() {
            try {
                const request = this.requestBuild()
                const response = await api.post("servicos", request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 201) {
                    notificacaoStore.exibirNotificacao("Serviço", "Serviço cadastrado com sucesso", 'success');
                    this.reset()
                    router.push('/servicos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar serviço:", error);
            }
        },
        async editar(id) {
            try {
                const request = this.requestBuild()
                const response = await api.put(`servicos/${id}`, request);
                const notificacaoStore = NotificacaoStore();
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Serviço", 'Serviço atualizado com sucesso', 'success');
                    this.servico = this.reset()
                    router.push('/servicos');
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                console.error("Erro ao cadastrar serviço:", error);
            }
        },
        async cancelar() {
            /*
            TODO verificar se o formulario esta preenchido e perguntar 
            se o usuário deseja descartar as informações cotnidas no fomrulario
            */
            router.push('/servicos');
        },
        async carregarServico(id) {
            try {
                const response = await api.get(`servicos/${id}`);
                this.servico = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(id) {
            this.carregarServico(id)
            router.push(`/servicos/${id}`);
        },
        async excluir(id) {
            try {
                const response = await api.delete(`servicos/${id}`);
                this.servico = response.data;
                const notificacaoStore = NotificacaoStore();
                notificacaoStore.exibirNotificacao("Servico", 'Serviço excluido com sucesso', 'success');
                router.push('/servicos');
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        requestBuild() {
            return {
                ...this.servico,
                contrato: this.servico.contrato.uuid,
                setor: this.servico.setor.uuid,
            };
        },
        reset() {
            return {
                setor: {
                    uuid: ""
                },
                contrato: {
                    uuid: ""
                }
            };
        }
    },
})