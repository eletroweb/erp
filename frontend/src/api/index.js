import axios from 'axios'

const API_URL = `http://localhost:3000/`

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

const token = `Bearer ${sessionStorage.getItem("token")}`
const plainAxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(async (config) => {
    const method = config.method.toUpperCase();
    if (token && method !== 'OPTIONS' && method !== 'GET') {
      config.headers.authorization = `Bearer ${token}`;
    }
  
    return config;
  });

api.interceptors.response.use(null, error => {
    console.log(error.response);
    /*if (error.response && error.response.config && error.response.status === 401) {
        return plainAxiosInstance.post('/refresh', {}, { headers: { 'Authorization': token }})
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
            })
    } else {
        return Promise.reject(error)
    }*/
})

export { api, plainAxiosInstance }
