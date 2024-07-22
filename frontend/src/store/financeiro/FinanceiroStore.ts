import { defineStore } from "pinia"
import { api } from "@/api/index"
import router from "@/router";
import { FinanceiroCategoriaEnum, FinanceiroCentroDeCustoEnum } from "@/enum/financeiro.enum";
import { AlertStore } from '@/store/AlertStore'
import dayjs from 'dayjs'

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
        resumo: {
            total_despesa: 0,
            total_receita: 0,
        },
        situacoes: [
            'PAGA',
            'PENDENTE',
            'VENCIDA',
            'ARQUIVADO'
        ],
        financeiro: {
            categoria: FinanceiroCategoriaEnum.DESPESA,
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
                categoria: FinanceiroCategoriaEnum.DESPESA,
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

            if (!this.validarFormulario())
                return

            const alertStore = AlertStore();
            try {
                const request = this.requestBuild();
                const response = await api.post("financeiro", request);
                if (response.status === 201) {
                    alertStore.show(response.data.message, "success")
                    this.financeiro = {}
                    router.push('/financeiro/financeiro');
                    this.listar()
                } else {
                    alertStore.show(response.statusText, "error")
                }
            } catch (error) {
                alertStore.show(error.message, "error")
            }
        },
        validarFormulario() {
            const alertStore = AlertStore();
            if (this.financeiro.descricao == null || this.financeiro.descricao.length == 0) {
                alertStore.show("Atenção, a Descrição deve ser informada", "warn");
                return
            }
            if (this.financeiro.descricao == undefined || this.financeiro.descricao.length < 3) {
                alertStore.show("O campo Descrição deve ser preenchido com no mínimo 3 caracteres", "warn");
                return false
            }
            if (this.financeiro.data_vencimento == null || this.financeiro.data_vencimento.length == 0) {
                alertStore.show("Atenção, a Data de Vencimento deve ser informada", "warn");
                return
            }
            if (this.financeiro.data_vencimento == undefined || this.financeiro.data_vencimento.length < 0) {
                alertStore.show("O campo Data de Vencimento deve ser preenchido com no mínimo 3 caracteres", "warn");
                return false
            }

            if (this.financeiro.valor_cobranca == undefined || this.financeiro.valor_cobranca.length < 0) {
                alertStore.show("O campo Valor deve ser preenchido com um valor maior que 0", "warn");
                return false
            }
            return true
        },
        requestBuild() {
            const { code } = this.financeiro.numero_parcelas;
            //const dataVencimento = dayjs(this.financeiro.data_vencimento).format('DD/MM/YYYY');

            return {
                ...this.financeiro,
                numero_parcelas: code,
            };
        },
        async editar() {
            if (!this.editarFormulario())
                return

            const alertStore = AlertStore();
            try {
                const request = this.requestBuild();
                const response = await api.put(`financeiro/${this.financeiro.uuid}`, request);
                if (response.status === 200) {
                    alertStore.show(response.data, "success")
                    this.financeiro = {}
                    router.push('/financeiro/financeiro');
                    this.listar()
                } else {
                    alertStore.show(response.statusText, "error")
                }
            } catch (error) {
                alertStore.show(error.message, "error")
            }
        },
        editarFormulario() {
            const alertStore = AlertStore();
            if (this.financeiro.descricao == null || this.financeiro.descricao.length == 0) {
                alertStore.show("Atenção, a Descrição deve ser informada", "warn");
                return
            }
            if (this.financeiro.descricao == undefined || this.financeiro.descricao.length < 3) {
                alertStore.show("O campo Descrição deve ser preenchido com no mínimo 3 caracteres", "warn");
                return false
            }
            if (this.financeiro.data_vencimento == null || this.financeiro.data_vencimento.length == 0) {
                alertStore.show("Atenção, a Data de Vencimento deve ser informada", "warn");
                return
            }
            if (this.financeiro.data_vencimento == undefined || this.financeiro.data_vencimento.length < 0) {
                alertStore.show("O campo Data de Vencimento deve ser preenchido com no mínimo 3 caracteres", "warn");
                return false
            }

            if (this.financeiro.valor_cobranca == undefined || this.financeiro.valor_cobranca.length < 0) {
                alertStore.show("O campo Valor deve ser preenchido com um valor maior que 0", "warn");
                return false
            }
            return true
        },
        async cancelar() {
            router.push('/financeiro/');
        },
        async carregarFinanceiro(id) {
            const alertStore = AlertStore();
            try {
                const response = await api.get(`financeiro/${id}`);
                this.financeiro = response.data;
                this.financeiro.data_vencimento = dayjs(this.financeiro.data_vencimento).format('DD/MM/YYYY');


                if (this.financeiro.setor?.uuid) {
                    this.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.SETOR;
                } else {
                    this.financeiro.centro_custo = FinanceiroCentroDeCustoEnum.CONTRATO;
                }

            } catch (error) {
                alertStore.show(error.message, "error")
                throw error;
            }
        },
        async exibir(uuid) {
            this.carregarFinanceiro(uuid)
            router.push(`/financeiro/financeiro/${uuid}`);
        },
        async excluir(uuid) {
            const alertStore = AlertStore();
            try {
                const response = await api.delete(`financeiro/${uuid}`);
                this.financeiro = response.data;
                alertStore.show("Financeiro exclúida com sucesso", "success")
                router.push('/financeiro/financeiro');
                this.listar()
                this.exibirFinanceiro = false
            } catch (error) {
                alertStore.show(error.message, "error")
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
        selecionarTipoCentroDeCusto() {
            if (this.financeiro.centro_custo == FinanceiroCentroDeCustoEnum.SETOR) {
                this.financeiro.contrato = { uuid: null }
            } else {
                this.financeiro.setor = { uuid: null }
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
            if (state.financeiro.contrato?.uuid) {
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

            return { uuid: null }
        },

        async carregarResumoTotal() {
            /*let data_inicio = '2024-01-01';
            let data_fim = '2024-07-01';
            let situacao = 'PENDENTE';
            const response = await api.get(`financeiro/resumo/totais?data_inicio=${data_inicio}&data_fim=${data_fim}&situacao=${situacao}`)*/
            const response = await api.get(`financeiro/resumo/totais`)
            const { total_despesa, total_receita } = response.data
            this.resumo.total_despesa = total_despesa
            this.resumo.total_receita = total_receita
        },


    },
})