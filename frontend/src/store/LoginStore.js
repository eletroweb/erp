import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        authenticaded:  localStorage.getItem("authenticaded"),
        login: {
            username: "yonatha",
            password: "123456"
        }
    }),
    actions: {
        async handleSubmit() {
            try {
                const response = await api.post("/login", this.login);
                if (response.status === 201) {
                    const {access_token} = response.data
                    localStorage.setItem("token", access_token);
                    localStorage.setItem("authenticaded", true);
                    this.login = {}
                    location.replace('/dashboard')
                } else {
                    console.error(response.statusText);
                }
            } catch (error) {
                console.error("Erro ao tentar efetuar login:", error);
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