import { defineStore } from "pinia"

export const AlertStore = defineStore('AlertStore', {
    state: () => ({
        display: false,
        title: "Operação realizada com sucesso",
        type: 'success'
    }),
    actions: {
        async show(title, type) {
            this.display = true
            this.title = title
            this.type = type
        },
    },
})