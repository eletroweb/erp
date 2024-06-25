import { defineStore } from "pinia"
import { api, upload } from "@/api/index"
import { AlertStore } from '@/store/AlertStore'

export const ConfiguracaoEmpresaLogomarcaStore = defineStore('ConfiguracaoEmpresaLogomarcaStore', {
    state: () => ({
        logomarca: null
    }),
    actions: {
        async carregarLogomarca() {
            const response = await api.get('/empresa/logomarca', { responseType: 'blob' });
            const logoUrl = URL.createObjectURL(response.data);
            this.logomarca = logoUrl;
        },
        async selecionarImagem(logomarca) {
            this.logomarca = logomarca
            this.formData = new FormData();
            this.formData.append('logomarca', logomarca[0]);
            const response = await upload('empresa/logomarca', this.formData)
            const alertStore = AlertStore();
            alertStore.show(response.data, "success")

            this.carregarLogomarca()
        },
    },
})