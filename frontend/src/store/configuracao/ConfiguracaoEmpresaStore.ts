import { defineStore } from "pinia"
import { api } from "@/api/index"
import { AlertStore } from '@/store/AlertStore'

export const ConfiguracaoEmpresaStore = defineStore('ConfiguracaoEmpresaStore', {
    state: () => ({
        empresa: {
            razaoSocial: null,
            nomeFantasia: null,
            cnpj: null,
            email: null,
            cep: null,
            estado: null,
            cidade: null,
            endereco: null,
            numero: null,
            complemento: null,
            logomarca: null
        }

    }),
    actions: {
        async exibir() {
            try {
                const response = await api.get(`empresa`);
                this.empresa = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async salvar() {
            try {
                const response = await api.post(`empresa`, this.empresa);
                const alertStore = AlertStore();
                alertStore.show(response.data, "success")
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
    getters: {}
})