import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "../store/NotificacaoStore"

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        authenticaded: localStorage.getItem("authenticaded"),
        user: {
            username: null,
            password: null
        }
    }),
    actions: {
        async login() {
            const notificacaoStore = NotificacaoStore();
            const response = await api.post("/login", this.user);
            if (response.status === 201) {
                const { access_token } = response.data
                localStorage.setItem("token", access_token);
                localStorage.setItem("authenticaded", true);
                this.login = {}
                location.replace('/dashboard')
                notificacaoStore.exibirNotificacao("Seja Bem Vindo", "Autenticação realizada com sucesso", 'success');
            } else {
                notificacaoStore.exibirNotificacao("Erro", response.statusText, 'warning');
            }
        },
        async logout() {
            localStorage.removeItem("token");
            localStorage.setItem("authenticaded", false);
            location.replace('/')
        },
        isLoggedIn() {
            return localStorage.getItem("authenticaded") == 'true'
        },
    },
})