import { defineStore } from "pinia"
import { api } from "@/api/index"
import moment from 'moment'
import { AlertStore } from '@/store/AlertStore'

export const ProjetoAtividadesStore = defineStore('ProjetoAtividadesStore', {
    state: () => ({
        exibirFormulario: false,
        editarRegistro: false,
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
            const alertStore = AlertStore();
            try {
                const request = this.requestBuild();
                const response = await api.post("projetos-atividades", request);
                if (response.status === 201) {
                    alertStore.show("Atividade cadastrada com sucesso", "success")
                    this.listar(this.projeto)
                    this.reset()
                    this.exibirFormulario = false
                } else {
                    alertStore.show(response.statusText, "error")
                }
            } catch (error) {
                console.log(error);
                alertStore.show("Não foi possível realizar essa operação", "error")
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
                await api.delete(`projetos-atividades/${uuid}`);
                const alertStore = AlertStore();
                alertStore.show("Atividade excluída com sucesso", "success")
                this.exibirFormulario = false
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
                projeto: this.editarRegistro ? this.atividade.projeto.uuid : this.atividade.projeto,
                data_inicio: moment(this.atividade.data_inicio).format('YYYY-MM-DD'),
                data_fim: moment(this.atividade.data_fim).format('YYYY-MM-DD')
            };
        },
        novo() {
            this.exibirFormulario = true
            this.reset()
        },
        async editar(uuid) {
            const response = await api.get(`projetos-atividades/${uuid}`);
            this.atividade = response.data;
            this.exibirFormulario = true
            this.editarRegistro = true
            return this.atividade
        },
        async salvarEdicao() {
            const alertStore = AlertStore();
            try {
                const request = this.requestBuild();
                const response = await api.put(`projetos-atividades/${this.atividade.uuid}`, request);

                if (response.status === 200) {
                    alertStore.show(`Atividade "${response.data.descricao}" editada com sucesso`, "success")
                    this.reset()
                    this.exibirFormulario = false
                    this.editarRegistro = false
                    this.listar(this.projeto)
                } else {
                    alertStore.show(response.statusText, "error")
                }
            } catch (error) {
                console.error("Erro ao cadastrar atividade:", error);
            }
        },
    },
})