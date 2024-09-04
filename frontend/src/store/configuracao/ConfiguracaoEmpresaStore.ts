import { defineStore } from "pinia"
import { api } from "@/api/index"
import { AlertStore } from '@/store/AlertStore'
import router from "@/router";

interface Empresa {
    razaoSocial: string | null;
    nomeFantasia: string | null;
    cnpj: string | null;
    email: string | null;
    cep: string | null;
    estado: string | null;
    cidade: string | null;
    endereco: string | null;
    numero: string | null;
    complemento: string | null;
    logomarca: string | null;
}

export const ConfiguracaoEmpresaStore = defineStore('ConfiguracaoEmpresaStore', {
    state: (): { empresa: Empresa } => ({
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
                const response = await api.get('empresa');
                const data = response.data;
                if (typeof data === 'object' && data !== null) {
                    this.empresa = {
                        razaoSocial: data.razaoSocial ?? null,
                        nomeFantasia: data.nomeFantasia ?? null,
                        cnpj: data.cnpj ?? null,
                        email: data.email ?? null,
                        cep: data.cep ?? null,
                        estado: data.estado ?? null,
                        cidade: data.cidade ?? null,
                        endereco: data.endereco ?? null,
                        numero: data.numero ?? null,
                        complemento: data.complemento ?? null,
                        logomarca: data.logomarca ?? null
                    };
                } else {
                    throw new Error('Formato de resposta da API inválido');
                }
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
                router.push('/dashboard')
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },
    getters: {}
})