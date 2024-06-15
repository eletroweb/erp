import { defineStore } from "pinia"

export const ConfiguracaoEmpresaStore = defineStore('ConfiguracaoEmpresaStore', {
    state: () => ({
        empresa: {
            razaoSocial: "",
            nomeFantasia: "",
            cnpj: "",
            email: "",
            cep: "",
            estado: "",
            cidade: "",
            endereco: "",
            numero: "",
            complemento: "",
            imagem: ""
        }

    }),
    actions: {
        salvarFornulario() {
            console.log("Botão salvar pressionado")
        },

        cancelar() {
            console.log("Botão cancelar pressionado")
        }
    },
})