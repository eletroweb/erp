import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { FinanceiroSituacaoEnum, FinanceiroTipoEnum } from "@/enum/financeiro.enum";
import { NotificacaoStore } from "../NotificacaoStore";

const downloadFile = async (response, nome) => {
    const contentType = response.headers.get('Content-Type');
    const blob = new Blob([response.data], { type: contentType });
    const fileURL = URL.createObjectURL(blob);
    const fileName = `comprovante-parcela-${nome}.${contentType.split('/')[1]}`;
    const link = document.createElement('a');

    link.href = fileURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    
    URL.revokeObjectURL(fileURL);
}

export const ReceitaStore = defineStore('ReceitaStore', {
    state: () => ({
        exibirReceita: false,
        receitas: [],
        situacoes: [
            'PAGA',
            'PENDENTE',
            'VENCIDA',
            'ARQUIVADO'
        ],
        receita: {
            uuid: null,
            descricao: null,
            tipo: FinanceiroTipoEnum.VARIAVEL,
            observacao: null,
            data_vencimento: null,
            data_pagamento: null,
            valor_cobranca: 100,
            parcelada: true,
            numero_parcelas: 1,
            parcelas: [],
            situacao: FinanceiroSituacaoEnum.PENDENTE
        },
        parcela_selecionada: null,
        modalConfirmacaoPagamento: false
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`receita`);
                this.receitas = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.receitas
        },
        async novo() {
            this.receita = {}
            router.push('/financeiro/receita/novo');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.post("receita", this.receita);
                if (response.status === 201) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
                    this.receita = {}
                    router.push('/financeiro/receita');
                    this.listar()
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                notificacaoStore.exibirNotificacao("Erro", error.message, 'error');
            }
        },
        async editar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.put(`receita/${this.receita.uuid}`, this.receita);
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Receita", response.data, 'success');
                    this.receita = {}
                    router.push('/financeiro/receita');
                    this.listar()
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                notificacaoStore.exibirNotificacao("Erro", error.message, 'error');
            }
        },
        async cancelar() {
            router.push('/financeiro/receita');
        },
        async carregarReceita(id) {
            try {
                const response = await api.get(`receita/${id}`);
                this.receita = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(uuid) {
            this.carregarReceita(uuid)
            router.push(`/financeiro/receita/${uuid}`);
        },
        async excluir(uuid) {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.delete(`receita/${uuid}`);
                this.receita = response.data;
                notificacaoStore.exibirNotificacao("Receita", response.data, 'success');
                //router.push('/receita');
                this.listar()
                this.exibirReceita = false
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        getCorPorSituacao(situacao) {
            const cores = {
                PAGA: "green",
                PENDENTE: "orange",
                VENCIDA: "red",
                ARQUIVADO: "grey"
            };
            return cores[situacao] || "black";
        },
        exibirModalPagamento(parcela) {
            this.modalConfirmacaoPagamento = true
            this.parcela_selecionada = this.receita.parcelas.filter(p => p.parcela === parcela)[0]
        },
        async downloadComprovante(row) {
            const nome = `${row.parcela}_de_${this.receita.numero_parcelas}_${row.data_vencimento}`
            
            const response = await api.get(`receita/parcela/download-comprovante/${row.comprovante}`, { responseType: 'blob' });
            if (response.status === 200) {
                await downloadFile(response, nome);
            } else {
                console.error('Erro ao baixar o arquivo:', response.statusText);
            }
        }
    },
})