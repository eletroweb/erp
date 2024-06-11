import { defineStore } from "pinia"
import { api } from "@/api/index"

export const ModuloStore = defineStore('ModuloStore', {
    state: () => ({
        modulos: [],
        roles: [],
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get("modulos");
                this.modulos = response.data;
                return this.modulos;
            } catch (error) {
                throw error;
            }
        },
    },
    getters: {
        getRolesSelecionadas: (state) => state.roles,
    }
})