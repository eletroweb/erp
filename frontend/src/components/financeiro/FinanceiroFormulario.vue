<template>
    <Toolbar>
        <template #start>
            <Button v-if="financeiroStore.financeiro.uuid == null" @click="financeiroStore.cadastrar()"
                severity="Success" text raised icon="pi pi-save" aria-label="Salvar" label="Salvar" />

            <Button v-else type="primary" @click="financeiroStore.editar(financeiroStore.financeiro.uuid)"
                severity="Success" text raised icon="pi pi-save" label="Salvar alterações" />

            <Button @click="financeiroStore.excluir(financeiroStore.financeiro.uuid)" severity="danger"
                icon="pi pi-eraser" text raised label="Excluir" />
        </template>

        <template #end>
            <Button @click="financeiroStore.cancelar()" text raised severity="secondary" icon="pi pi-backward"
                label="Cancelar" />
        </template>
    </Toolbar>
    <div class="container grid-container">
        <Fieldset legend="Dados">
            <div>

                <h1>Registro Financeiro: {{ financeiroStore.financeiro.descricao }}</h1>
                <div class="linha coluna4">
                    <div>
                        <div>
                            <label>Categoria</label>
                            <RadioButton v-model="financeiroStore.financeiro.categoria" inputId="ingredient1"
                                name="receita" value="RECEITA" /> Receita

                            <RadioButton v-model="financeiroStore.financeiro.categoria" inputId="ingredient1"
                                name="despesa" value="DESPESA" /> Despesa
                        </div>
                    </div>

                    <div v-if="financeiroStore.financeiro.categoria == 'DESPESA'">
                        <label>Centro de Custo</label>
                        <Select v-model="financeiroStore.financeiro.centro_custo" :options="centroDeCustoDisponiveis"
                            @change="financeiroStore.selecionarTipoCentroDeCusto()" optionLabel="name"
                            placeholder="Selecione o centro de custo" class="w-full md:w-56" />
                    </div>

                    <div>
                        <label>Setor</label>
                        <Select style="width: 240px" v-model="financeiroStore.financeiro.setor"
                            :options="setorStore.setores" optionLabel="descricao" placeholder="Selecione o Setor..."
                            class="w-full md:w-56" />
                    </div>

                    <div>
                        <label>Contrato</label>
                        <Select style="width: 240px" v-model="financeiroStore.financeiro.contrato"
                            :options="contratoStore.contratos" optionLabel="descricao"
                            placeholder="Selecione o contrato..." class="w-full md:w-56" />
                    </div>
                </div>
                <div class="linha coluna2">
                    <div>
                        <div>
                            <label>Descrição</label>
                            <InputText type="text" v-model="financeiroStore.financeiro.descricao" class="input" />
                        </div>
                    </div>

                    <div>
                        <label>Fornecedor</label>
                        <InputText type="text" v-model="financeiroStore.financeiro.fornecedor" class="input" />
                    </div>
                </div>
                <div class="linha coluna3">
                    <div>
                        <label>Data de Vencimento</label>
                        <DatePicker v-model="financeiroStore.financeiro.data_vencimento" showIcon iconDisplay="input" />
                    </div>
                    <div>
                        <label>Valor</label>
                        <InputNumber v-model="financeiroStore.financeiro.valor_cobranca"
                            @blur="selecionarNumeroDeParcelas" inputId="currency-us" mode="currency" currency="BRL"
                            locale="pt-BR" />
                    </div>
                    <div>
                        <label>Número de Parcelas</label>
                        <Select v-model="financeiroStore.financeiro.numero_parcelas" :options="parcelasDisponiveis"
                            @change="selecionarNumeroDeParcelas()" optionLabel="name" placeholder="Parscelas"
                            class="w-full md:w-56" />
                    </div>
                </div>

                <div class="linha coluna1">
                    <label>Observação</label>
                    <Textarea v-model="financeiroStore.financeiro.observacao" rows="5" cols="30" />
                </div>
            </div>
        </Fieldset>


        <Fieldset legend="Parcelas">
            <FinanceiroParcelasLista :financeiro="financeiroStore.financeiro" />
        </Fieldset>
    </div>
</template>

<script>
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import { FinanceiroSituacaoEnum, FinanceiroCentroDeCustoEnum } from '@/enum/financeiro.enum'
import dayjs from 'dayjs'
import FinanceiroParcelasLista from '@/components/financeiro/parcela/FinanceiroParcelasLista.vue'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Money3Component } from 'v-money3'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import RadioButton from 'primevue/radioButton';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/DatePicker';
import InputNumber from 'primevue/InputNumber';
import Toolbar from 'primevue/toolbar';
import Fieldset from 'primevue/fieldset';
import { SetorStore } from '@/store/SetorStore';
import { ContratoStore } from '@/store/ContratoStore'

dayjs.extend(customParseFormat);

export default {
    name: "FinanceiroFormulario",
    components: {
        FinanceiroParcelasLista,
        money3: Money3Component,
        Button,
        InputText,
        Select,
        RadioButton,
        Textarea,
        DatePicker,
        InputNumber,
        Toolbar,
        Fieldset
    },
    setup() {
        const financeiroStore = FinanceiroStore();

        const setorStore = SetorStore()
        setorStore.listar()

        const contratoStore = ContratoStore()
        contratoStore.listar()

        return { financeiroStore, setorStore, contratoStore };
    },
    data() {
        return {
            parcelasDisponiveis: [
                { name: '1x', code: 1 },
                { name: '2x', code: 2 },
                { name: '3x', code: 3 },
                { name: '4x', code: 4 },
                { name: '5x', code: 5 },
                { name: '6x', code: 6 },
                { name: '7x', code: 7 },
                { name: '8x', code: 8 },
                { name: '9x', code: 9 },
                { name: '10x', code: 10 },
                { name: '11x', code: 11 },
                { name: '12x', code: 12 }
            ],
            centroDeCustoDisponiveis: [
                { name: 'Setor', code: 'SETOR' },
                { name: 'Contrato', code: 'CONTRATO' }
            ]
        }
    },
    async mounted() {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.financeiroStore.carregarFinanceiro(this.id)
        }
        this.financeiroStore.financeiro.numero_parcelas = 1
        this.selecionarNumeroDeParcelas()
    },
    methods: {
        selecionarNumeroDeParcelas() {
            const { numero_parcelas, valor_cobranca } = this.financeiroStore.financeiro
            const parcelaSelecionada = numero_parcelas.code

            const valor = valor_cobranca / parcelaSelecionada
            const situacao = FinanceiroSituacaoEnum.PENDENTE;

            let data_vencimento = dayjs(this.financeiroStore.financeiro.data_vencimento).format('DD/MM/YYYY')
            let parcelaInicial = 1

            this.financeiroStore.financeiro.parcelas = []

            if (parcelaSelecionada === 1) {
                const data_pagamento = null
                this.financeiroStore.financeiro.parcelas.push({
                    data_vencimento,
                    data_pagamento,
                    parcela: parcelaInicial,
                    valor,
                    situacao
                })
            } else {
                for (let parcela = 0; parcela < parcelaSelecionada; parcela++) {
                    const mesCobranca = parcela === 0 ? 0 : 1
                    data_vencimento = dayjs(data_vencimento, 'DD/MM/YYYY').add(mesCobranca, 'month').format('DD/MM/YYYY')
                    const data_pagamento = null

                    this.financeiroStore.financeiro.parcelas.push({
                        parcela: parcelaInicial,
                        valor,
                        data_vencimento,
                        data_pagamento,
                        situacao
                    })
                    parcelaInicial += 1
                }
            }
        },
    }
}
</script>

<style scoped>
div {
    gap: 5px
}

.container {
    display: grid;
    padding: 5px;
}

.grid-container {
    grid-template-columns: 100%;
}

.linha {
    display: grid;
    margin-bottom: 5px
}

.coluna2 {
    grid-template-columns: 50% 50%;
}

.coluna3 {
    grid-template-columns: 33.33% 33.33% 33.33%;
}

.coluna4 {
    grid-template-columns: 25% 30% 20% 25%;
}

.endereco {
    grid-template-columns: 75% 25%;
}

.input {
    width: 100%;
}
</style>