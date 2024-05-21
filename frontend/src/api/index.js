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
    const {statusCode} = error.response.data
    if (error.response && error.response.config && [401,403].includes(statusCode)) {
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
        if (error.response.data.statusCode == 500) {
            notificacaoStore.exibirNotificacao("Erro Interno", "Tente novamente mais tarde", 'error');
        }
        return Promise.reject(error)
    }
})

const upload = async (endpoint, formData) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/${endpoint}`,
        data: formData
    };

    try {
        return await axios.request(config)
    } catch (error) {
        const notificacaoStore = NotificacaoStore();
        if (error.response) {
            notificacaoStore.exibirNotificacao("Solicitação inválida", error.response.data.message, 'error');
        } else if (error.request) {
            console.error('Erro na requisição:', error.request);
        } else {
            console.error('Erro:', error.message);
        }
        console.error('Configuração da requisição:', error.config);
        throw error;
    }
}

export { api, upload }
