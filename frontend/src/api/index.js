import axios from 'axios'
import { NotificacaoStore } from "../store/NotificacaoStore"

const API_URL = `http://localhost:3000/`

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

const plainAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config;
});

api.interceptors.response.use(null, error => {
    const notificacaoStore = NotificacaoStore();
    if (error.response && error.response.config && error.response.status === 401) {
        notificacaoStore.exibirNotificacao("Atenção", "Você não possui permissão para acessar este recurso", 'warning');
        /*return plainAxiosInstance.post('/refresh', {}, { headers: { 'Authorization': token }})
            .then(response => {
                sessionStorage.getItem("token") = response.data.csrf
                localStorage.signedIn = true

                let retryConfig = error.response.config
                retryConfig.headers['Authorization'] = sessionStorage.getItem("token")
                return plainAxiosInstance.request(retryConfig)
            }).catch(error => {
                delete sessionStorage.getItem("token")
                delete localStorage.signedIn

                //location.replace('/')
                return Promise.reject(error)
            })*/

    } else {
        return Promise.reject(error)
    }
})

export { api, plainAxiosInstance }
