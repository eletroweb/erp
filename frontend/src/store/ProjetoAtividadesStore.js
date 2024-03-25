import { defineStore } from "pinia"
import { api } from "@/api/index"

export const projetoAtividadesStore = defineStore('projetoAtividadesStore', {
    state: () => ({
        atividades: [],
        btnSalvarValido: true
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`projetos-atividades/find-by-projeto/2b68b6e0-4b5d-4b7e-b14b-93f8592d8062`);
                this.atividades = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
    },
})