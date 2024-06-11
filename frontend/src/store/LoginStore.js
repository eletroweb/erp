import { defineStore } from "pinia"
import { api } from "@/api/index"
import { NotificacaoStore } from "../store/NotificacaoStore"
import VueJwtDecode from 'vue-jwt-decode';

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        authenticaded: localStorage.getItem("authenticaded"),
        user: {
            email: null,
            password: null,
            info: {}
        }
    }),
    actions: {
        // RF8.1 Login de usuário
        async login() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.post("/auth/login", this.user);
                if (response.status === 200) {
                    const { access_token } = response.data
                    if (!this.haveRoles(access_token)) {
                        notificacaoStore.exibirNotificacao("Atenção", "Seu usuário não possui nenhuma permissão associada", 'warning');
                    } else {
                        localStorage.setItem("token", access_token);
                        localStorage.setItem("authenticaded", true);
                        this.setUserinfoFromToken(access_token)
                        this.login = {}
                        location.replace('/dashboard')
                        notificacaoStore.exibirNotificacao("Seja Bem Vindo", "Autenticação realizada com sucesso", 'success');
                    }
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.message, 'warning');
                }
            } catch (e) {
                notificacaoStore.exibirNotificacao("Erro", e.response.data.message, 'warning');
            }
        },
        haveRoles(token) {
            const tokenPayload = VueJwtDecode.decode(token);
            return tokenPayload
        },
        setUserinfoFromToken(token) {
            const tokenPayload = VueJwtDecode.decode(token);
            const {
                roles,
                scope,
                name,
                fullName,
                email
            } = tokenPayload;

            const userInfoJSON = JSON.stringify(
                {
                    roles,
                    scope,
                    name,
                    email,
                    fullName
                }
            );
            localStorage.setItem('userInfo', userInfoJSON);
        },
        getUserInfo() {
            const userInfoJSON = localStorage.getItem('userInfo');
            if (userInfoJSON) {
                const userInfo = JSON.parse(userInfoJSON);
                return userInfo;
            } else {
                return null;
            }
        },
        async logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            localStorage.setItem("authenticaded", false);
            location.replace('/')
        },
        isLoggedIn() {
            return localStorage.getItem("authenticaded") == 'true'
        },
    },
})