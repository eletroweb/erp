import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
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


                    console.log(response.data);
                    localStorage.setItem("token", access_token);
                    this.login = {}
                    //router.push('/dashboard');
                } else {
                    console.error(response.statusText);
                }
            } catch (error) {
                console.error("Erro ao tentar efetuar login:", error);
            }
        },
    },
})