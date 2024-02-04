import { defineStore } from "pinia"
import { ElNotification } from 'element-plus'

export const NotificacaoStore = defineStore('NotificacaoStore', {
    state: () => ({
        title: "Success",
        message: "Operação realizada com sucesso.",
        type: 'success'
    }),
    actions: {
        async exibirNotificacao(title, message, type) {
            ElNotification({
                title,
                message,
                type,
            })
        },
    },
})