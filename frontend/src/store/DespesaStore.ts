import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { NotificacaoStore } from "./NotificacaoStore"
import { DespesaParcelaSituacaoRequest } from "@/components/financeiro/despesas/parcela/despesa.parcela.situacao.request";
import { FinanceiroSituacaoEnum, FinanceiroTipoEnum } from "@/enum/financeiro.enum";

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

export const DespesaStore = defineStore('DespesaStore', {
    state: () => ({
        exibirDespesa: false,
        despesas: [],
        situacoes: [
            'PAGA',
            'PENDENTE',
            'VENCIDA',
            'ARQUIVADO'
        ],
        despesa: {
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
                const response = await api.get(`despesas`);
                this.despesas = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.despesas
        },
        async novo() {
            this.despesa = {}
            router.push('/financeiro/despesas/novo');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.post("despesas", this.despesa);
                if (response.status === 201) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
                    this.despesa = {}
                    router.push('/financeiro');
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
                const response = await api.put(`despesas/${this.despesa.uuid}`, this.despesa);
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Despesa", response.data, 'success');
                    this.despesa = {}
                    router.push('/financeiro');
                    this.listar()
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                notificacaoStore.exibirNotificacao("Erro", error.message, 'error');
            }
        },
        async cancelar() {
            router.push('/financeiro');
        },
        async carregarDespesa(id) {
            try {
                const response = await api.get(`despesas/${id}`);
                this.despesa = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(uuid) {
            this.carregarDespesa(uuid)
            router.push(`/financeiro/despesa/${uuid}`);
        },
        async excluir(uuid) {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.delete(`despesas/${uuid}`);
                this.despesa = response.data;
                notificacaoStore.exibirNotificacao("Despesa", response.data, 'success');
                //router.push('/despesa');
                this.listar()
                this.exibirDespesa = false
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
            this.parcela_selecionada = this.despesa.parcelas.filter(p => p.parcela === parcela)[0]
        },
        async downloadComprovante(row) {
            const nome = `${row.parcela}_de_${this.despesa.numero_parcelas}_${row.data_vencimento}`
            
            const response = await api.get(`despesas/parcela/download-comprovante/${row.comprovante}`, { responseType: 'blob' });
            if (response.status === 200) {
                await downloadFile(response, nome);
            } else {
                console.error('Erro ao baixar o arquivo:', response.statusText);
            }
        }
    },
})