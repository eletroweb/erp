import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { FinanceiroCategoriaEnum, FinanceiroCentroDeCustoEnum, FinanceiroSituacaoEnum, FinanceiroTipoEnum } from "@/enum/financeiro.enum";
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

export const FinanceiroStore = defineStore('FinanceiroStore', {
    state: () => ({
        exibirFinanceiro: false,
        financeiroLista: [],
        situacoes: [
            'PAGA',
            'PENDENTE',
            'VENCIDA',
            'ARQUIVADO'
        ],
        financeiro: {
            categoria:FinanceiroCategoriaEnum.DESPESA,
            setor: {
                uuid: null
            },
            contrato: {
                uuid: null
            },
            centro_custo: FinanceiroCentroDeCustoEnum.SETOR
        },
        parcela_selecionada: null,
        modalConfirmacaoPagamento: {
                exibir: false,
                instrucao: "Clique para selecionar o comprovante",
                backgroundStyle: 'background: #ff9800',
                btnConfirmar: true,
                formData: null,
                comprovante: null,
                data_pagamento: null
        }
    }),
    actions: {
        async listar() {
            try {
                const response = await api.get(`financeiro`);
                this.financeiroLista = response.data;
            } catch (error) {
                console.log(error);
                throw error;
            }
            return this.financeiroLista
        },
        async novo() {
            this.exibirFinanceiro = false
            this.financeiroLista = []
            this.situacoes = [
                'PAGA',
                'PENDENTE',
                'VENCIDA',
                'ARQUIVADO'
            ]
            this.financeiro = {
                categoria:FinanceiroCategoriaEnum.DESPESA,
                setor: {
                    uuid: null
                },
                contrato: {
                    uuid: null
                },
                centro_custo: FinanceiroCentroDeCustoEnum.SETOR
            }
            this.parcela_selecionada = null,
            this.modalConfirmacaoPagamento.exibir = false
            router.push('/financeiro/financeiro/novo');
        },
        async cadastrar() {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.post("financeiro", this.financeiro);
                if (response.status === 201) {
                    const { title, message, type } = response.data
                    notificacaoStore.exibirNotificacao(title, message, type);
                    this.financeiro = {}
                    router.push('/financeiro/financeiro');
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
                const response = await api.put(`financeiro/${this.financeiro.uuid}`, this.financeiro);
                if (response.status === 200) {
                    notificacaoStore.exibirNotificacao("Financeiro", response.data, 'success');
                    this.financeiro = {}
                    router.push('/financeiro/financeiro');
                    this.listar()
                } else {
                    notificacaoStore.exibirNotificacao("Erro", response.statusText, 'error');
                }
            } catch (error) {
                notificacaoStore.exibirNotificacao("Erro", error.message, 'error');
            }
        },
        async cancelar() {
            router.push('/financeiro/');
        },
        async carregarFinanceiro(id) {
            try {
                const response = await api.get(`financeiro/${id}`);
                this.financeiro = response.data;
                if (this.financeiro.setor?.uuid) {
                    this.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.SETOR;
                } else  {
                    this.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.CONTRATO;
                }
                
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        async exibir(uuid) {
            this.carregarFinanceiro(uuid)
            router.push(`/financeiro/financeiro/${uuid}`);
        },
        async excluir(uuid) {
            const notificacaoStore = NotificacaoStore();
            try {
                const response = await api.delete(`financeiro/${uuid}`);
                this.financeiro = response.data;
                notificacaoStore.exibirNotificacao("Financeiro", "Financeiro exclúida com sucesso", 'success');
                router.push('/financeiro/financeiro');
                this.listar()
                this.exibirFinanceiro = false
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
            this.modalConfirmacaoPagamento = {
                exibir: true,
                instrucao: "Clique para selecionar o comprovante",
                backgroundStyle: 'background: #ff9800',
                btnConfirmar: true,
                formData: null,
                comprovante: null,
                data_pagamento: null
            }
            this.parcela_selecionada = this.financeiro.parcelas.filter(p => p.parcela === parcela)[0]
        },
        async downloadComprovante(row) {
            const nome = `${row.parcela}_de_${this.financeiro.numero_parcelas}_${row.data_vencimento}`
            
            const response = await api.get(`financeiro/parcela/download-comprovante/${row.comprovante}`, { responseType: 'blob' });
            if (response.status === 200) {
                await downloadFile(response, nome);
            } else {
                console.error('Erro ao baixar o arquivo:', response.statusText);
            }
        },
        selecionarTipoCentroDeCusto(){
            if (this.financeiro.centro_custo == FinanceiroCentroDeCustoEnum.SETOR) {
                this.financeiro.contrato = {uuid: null}
            } else {
                this.financeiro.setor = {uuid: null}
            }
        },
        setContratoUuid(uuid: string) {
            if (!this.financeiro.contrato)
                this.financeiro.contrato = { uuid: '' };
            
            this.financeiro.contrato.uuid = uuid;
        },
        setSetorUuid(uuid: string) {
            if (!this.financeiro.setor)
                this.financeiro.setor = { uuid: '' };
            
            this.financeiro.setor.uuid = uuid;
        },
    },
    getters: {
        getFinanciero: (state) => state.financeiro,
        getTipoCentroDeCusto: (state) => {
            if (state.financeiro.contrato?.uuid){
                state.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.CONTRATO
                return FinanceiroCentroDeCustoEnum.CONTRATO
            }
                
            state.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.SETOR
            return FinanceiroCentroDeCustoEnum.SETOR
        },
        getSetorUuid: (state) => {
            if (state.financeiro.setor?.uuid) 
                return state.financeiro.setor?.uuid
            
            return null
        },    
        getContratoUuid: (state) => {
            if (state.financeiro.contrato?.uuid) 
                return state.financeiro.contrato?.uuid
            
            return {uuid: null}
        },
    },
})