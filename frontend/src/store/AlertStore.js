import { defineStore } from "pinia"

/*
severity:
    success
    info
    warn
    error
    secondary
    contrast
*/

export const AlertStore = defineStore('AlertStore', {
    state: () => ({
        display: false,
        message: "Operação realizada com sucesso",
        severity: 'success'
    }),
    actions: {
        async show(message, severity) {
            this.display = true
            this.message = message
            this.severity = severity

            setTimeout(() => {
                this.display = false;
              }, 10000);
        },
    },
})