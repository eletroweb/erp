import { defineStore } from "pinia"
import { api } from "@/api/index"
import { AlertStore } from '@/store/AlertStore'
import router from "@/router";

export const UsuarioLogadoStore = defineStore('UsuarioLogadoStore', {
    state: () => ({
        settings: {}
    }),
    actions: {
        async me() {
            try {
                const response = await api.get(`usuarios/settings/me`);
                this.settings = response.data
                const alertStore = AlertStore();
                if (!this.settings.has_company) {
                    alertStore.show("Por favor, cadastre sua empresa em configurações.", "warn")
                    //location.replace('/configuracoes')
                    router.push('/configuracoes');
                } else {
                    //location.replace('/dashboard')
                    router.push('/dashboard');
                }
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async getSettings() {
            try {
                const response = await api.get(`usuarios/settings/me`);
                this.settings = response.data
                return response.data
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },
})