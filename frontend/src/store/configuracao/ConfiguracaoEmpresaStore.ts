import { defineStore } from "pinia"

export const ConfiguracaoEmpresaStore = defineStore('ConfiguracaoEmpresaStore', {
    state: () => ({
        empresa: {
            razaoSocial: null,
            nomeFantasia: null,
            cnpj: null,
            email: null,
            cep: null,
            estado: null,
            cidade: null,
            endereco: null,
            numero: null,
            complemento: null,
            imagem: null
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