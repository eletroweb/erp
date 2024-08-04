<template>
    <div>
        <Toolbar>
            <template #start>
                <Button id="btnSalvar" v-if="financeiroStore.financeiro.uuid == null"
                    @click="financeiroStore.cadastrar()" severity="Success" text raised icon="pi pi-save"
                    aria-label="Salvar" label="Salvar" />

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
                        <template v-if="financeiroStore.financeiro.categoria == 'DESPESA'">
                            <div>
                                <label>Centro de Custo</label>
                                <Select id="centroDeCusto" name="centroDeCusto"
                                    v-model="financeiroStore.financeiro.centro_custo"
                                    :options="centroDeCustoDisponiveis" optionValue="value"
                                    @change="financeiroStore.selecionarTipoCentroDeCusto()" optionLabel="name"
                                    placeholder="Selecione o centro de custo" class="w-full md:w-56" />
                            </div>

                            <div v-if="financeiroStore.financeiro.centro_custo == 'SETOR'">
                                <label>Setor</label>
                                <Select style="width: 240px" v-model="financeiroStore.financeiro.setor"
                                    :options="setorStore.setores" optionLabel="descricao"
                                    placeholder="Selecione o Setor..." class="w-full md:w-56" />
                            </div>

                            <div v-else>
                                <label>Contrato</label>
                                <Select style="width: 240px" v-model="financeiroStore.financeiro.contrato"
                                    :options="contratoStore.contratos" optionLabel="descricao"
                                    placeholder="Selecione o contrato..." class="w-full md:w-56" />
                            </div>
                        </template>
                        <template v-else>
                            <div>
                                <label>Setor</label>
                                <Select style="width: 240px" v-model="financeiroStore.financeiro.setor"
                                    :options="setorStore.setores" optionLabel="descricao"
                                    placeholder="Selecione o Setor..." class="w-full md:w-56" />
                            </div>
                        </template>

                    </div>
                    <div class="linha coluna2">
                        <div>
                            <div>
                                <label>Descrição</label>
                                <InputText name="descricao" type="text" v-model="financeiroStore.financeiro.descricao"
                                    class="input" />
                            </div>
                        </div>

                        <div>
                            <label>Fornecedor</label>
                            <InputText name="fornecedor" type="text" v-model="financeiroStore.financeiro.fornecedor"
                                class="input" />
                        </div>
                    </div>
                    <div class="linha coluna5">
                        <div>
                            <label>Data</label>
                            <DatePicker inputId="data_vencimento" v-model="financeiroStore.financeiro.data_vencimento"
                                showIcon iconDisplay="input" />
                        </div>
                        <div>
                            <label>Valor Nominal</label>
                            <InputNumber name="valor_nominal" v-model="financeiroStore.financeiro.valor_cobranca"
                                inputId="valor_nominal" mode="currency" currency="BRL" locale="pt-BR" />
                        </div>

                        <div>
                            <label>Parcelas</label>
                            <Select inputId="parcelas" v-model="financeiroStore.financeiro.numero_parcelas"
                                :options="parcelasDisponiveis" @change="selecionarNumeroDeParcelas()" optionLabel="name"
                                placeholder="Parcelas" class="w-full md:w-56" />
                        </div>

                        <div>
                            <label>% Juros {{ financeiroStore.financeiro.juros }}</label>
                            <InputNumber inputId="juros" @blur="calcularTotalComJuros($event)"
                                v-model="financeiroStore.financeiro.juros" />
                        </div>

                        <div v-if="financeiroStore.financeiro.juros > 0">
                            <label>Valor Total</label>
                            <InputNumber v-model="financeiroStore.financeiro.valor_total" inputId="valor_total"
                                mode="currency" currency="BRL" locale="pt-BR" :disabled="true" />
                        </div>
                    </div>

                    <Accordion value="0">
                        <AccordionPanel value="0">
                            <AccordionHeader>Observação</AccordionHeader>
                            <AccordionContent>
                                <Textarea inputId="observacao" style="width: 100%;"
                                    v-model="financeiroStore.financeiro.observacao" rows="5" cols="30" />
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </Fieldset>


            <Fieldset legend="Parcelas">
                <FinanceiroParcelasLista :financeiro="financeiroStore.financeiro" />
            </Fieldset>
        </div>
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
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import DatePicker from 'primevue/datepicker';
import InputNumber from 'primevue/inputnumber';
import Toolbar from 'primevue/toolbar';
import Fieldset from 'primevue/fieldset';
import { SetorStore } from '@/store/SetorStore';
import { ContratoStore } from '@/store/ContratoStore'

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

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
        Fieldset,
        Accordion,
        AccordionPanel,
        AccordionHeader,
        AccordionContent
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
                { name: 'Setor', value: FinanceiroCentroDeCustoEnum.SETOR },
                { name: 'Contrato', value: FinanceiroCentroDeCustoEnum.CONTRATO }
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
            const { numero_parcelas, valor_cobranca, valor_total, juros } = this.financeiroStore.financeiro
            const parcelaSelecionada = numero_parcelas.code

            let valor = valor_cobranca / parcelaSelecionada
            if (juros > 0) {
                valor = valor_total / parcelaSelecionada
            }
            const situacao = FinanceiroSituacaoEnum.PENDENTE;
            let data_vencimento = this.financeiroStore.financeiro.data_vencimento
            let parcelaInicial = 1

            this.financeiroStore.financeiro.parcelas = []
            const data_pagamento = null

            if (parcelaSelecionada === 1) {

                this.financeiroStore.financeiro.parcelas.push({
                    data_vencimento,
                    data_pagamento,
                    parcela: parcelaInicial,
                    valor,
                    situacao
                })
            } else {

                let data_mes_seguinte = dayjs(data_vencimento);
                data_mes_seguinte = data_mes_seguinte.add(1, 'month');

                for (let parcela = 0; parcela < parcelaSelecionada; parcela++) {
                    if (parcela > 0)
                        data_mes_seguinte = data_mes_seguinte.add(1, 'month');

                    this.financeiroStore.financeiro.parcelas.push({
                        parcela: parcelaInicial,
                        valor,
                        data_vencimento: data_mes_seguinte.toDate(),
                        data_pagamento,
                        situacao
                    });

                    parcelaInicial += 1;
                }
            }
        },
        calcularTotalComJuros(event) {
            const juros = event.value;
            const { valor_cobranca } = this.financeiroStore.financeiro;
            if (!isNaN(parseFloat(juros)) && !isNaN(parseFloat(valor_cobranca))) {
                const valor_total = parseFloat(valor_cobranca) + (parseFloat(valor_cobranca) * (parseFloat(juros) / 100));
                this.financeiroStore.financeiro.valor_total = valor_total.toFixed(2);
                this.selecionarNumeroDeParcelas();
            }
        }
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
    grid-template-columns: 20% 23% 14% 25%;
}

.coluna5 {
    grid-template-columns: repeat(5, 1fr);
}

.endereco {
    grid-template-columns: 75% 25%;
}

.input {
    width: 100%;
}
</style>