import { defineStore } from "pinia"
import { api } from "@/api/index"
import { AlertStore } from '@/store/AlertStore'

export const Signup = defineStore('Signup', {
    state: () => ({
        usuario: {
            nome: null,
            email: null,
            password: null
        },
        novo_usuario: false
    }),
    actions: {
        async signup() {
            const response = await api.post("/auth/signup", this.usuario);
            const alertStore = AlertStore();
            alertStore.show(response.data, "success")
            this.signup.novo_usuario = false
        },
    },
})