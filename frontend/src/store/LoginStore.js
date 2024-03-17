import { defineStore } from "pinia"
import { api } from "@/api/index"
import { NotificacaoStore } from "../store/NotificacaoStore"
import VueJwtDecode from 'vue-jwt-decode';

export const LoginStore = defineStore('LoginStore', {
    state: () => ({
        authenticaded: localStorage.getItem("authenticaded"),
        user: {
            username: null,
            password: null,
            info: {}
        }
    }),
    actions: {
        async login() {
            const notificacaoStore = NotificacaoStore();
            const response = await api.post("/login", this.user);
            if (response.status === 201) {
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
                notificacaoStore.exibirNotificacao("Erro", response.statusText, 'warning');
            }
        },
        haveRoles(token) {
            const tokenPayload = VueJwtDecode.decode(token);
            return tokenPayload.realm_access != undefined
        },
        setUserinfoFromToken(token) {
            const tokenPayload = VueJwtDecode.decode(token);
            const {
                realm_access: { roles },
                scope,
                name,
                given_name,
                family_name,
                email
            } = tokenPayload;

            const userInfoJSON = JSON.stringify(
                {
                    roles,
                    scope,
                    name,
                    given_name,
                    family_name,
                    email,
                    fullName: `${given_name} ${family_name}`
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