<template>
    <div>
        <div class="button-container">
            <Button label="Novo registro financeiro" @click="financeiroStore.novo()" severity="info" size="small" />
        </div>

        <div class="resumo">
            <MeterGroup :value="resumo" />
        </div>

        <DataTable :value="this.registros" tableStyle="min-width: 50rem">
            <Column field="categoria" header="Categoria">
                <template #body="slotProps">
                    <Tag v-if="slotProps.data.categoria === 'RECEITA'" severity="success" value="Receita"></Tag>
                    <Tag v-else-if="slotProps.data.categoria === 'DESPESA'" severity="warn" value="Despesa"></Tag>
                </template>
            </Column>
            <Column field="tipo" header="Tipo">
                <template #body="slotProps">
                    <Tag v-if="slotProps.data.tipo === 'VARIAVEL'" severity="info" value="Variável"></Tag>
                    <Tag v-else severity="secondary" value="Fixa"></Tag>
                </template>
            </Column>
            <Column field="descricao" header="Descrição"></Column>
            <Column field="data_vencimento" header="Vencimento">
                <template #body="slotProps">
                    {{ $moment.format(slotProps.data.data_vencimento) }}
                </template>
            </Column>
            <Column field="data_pagamento" header="Pagamento">
                <template #body="slotProps">
                    {{ $moment.format(slotProps.data.data_vencimento) }}
                </template>
            </Column>
            <Column field="vencida" header="Vencida">
                <template #body="slotProps">
                    {{ slotProps.data.vencida ? 'Sim' : 'Não' }}
                </template>
            </Column>

            <Column field="valor_cobranca" header="Valor">
                <template #body="slotProps">
                    {{ this.formatarReal(slotProps.data.valor_cobranca) }}
                </template>
            </Column>
            <Column field="situacao" header="Situação">
                <template #body="slotProps">
                    <Tag v-if="slotProps.data.situacao === 'PENDENTE'" severity="warn" :value="slotProps.data.situacao">
                    </Tag>
                    <Tag v-else-if="slotProps.data.situacao === 'PAGA'" severity="success"
                        :value="slotProps.data.situacao"></Tag>
                    <Tag v-else-if="slotProps.data.situacao === 'VENCIDA'" severity="danger"
                        :value="slotProps.data.situacao"></Tag>
                    <Tag v-else severity="Contrast" :rounded="slotProps.data.situacao"></Tag>
                </template>
            </Column>
            <Column header="">
                <template #body="slotProps">
                    <Button label="Editar" @click="financeiroStore.exibir(slotProps.data.uuid)" severity="info"
                        size="small" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import FinanceiroFormulario from './FinanceiroFormulario.vue'
import { formatarReal } from '@/common/util.ts';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import MeterGroup from 'primevue/MeterGroup';
dayjs.extend(customParseFormat);

export default {
    components: {
        FinanceiroFormulario,
        DataTable,
        Column,
        Tag,
        Button,
        MeterGroup
    },
    setup() {
        const financeiroStore = FinanceiroStore()
        const valor = ref('');
        const formattedValue = ref('');

        watch(valor, (newValue) => {
            if (!isNaN(newValue)) {
                formattedValue.value = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(newValue);
            } else {
                formattedValue.value = '';
            }
        });
        return {
            financeiroStore, filter: ref(''), valor,
            formattedValue,
            formatarReal
        }
    },
    async mounted() {
        this.registros = await this.financeiroStore.listar();
        const despesas = this.registros.filter(registro => registro.categoria === 'DESPESA');
        const receitas = this.registros.filter(registro => registro.categoria === 'RECEITA');

        const pendentes = this.registros.filter(registro => registro.situacao === 'PENDENTE');
        const pagas = this.registros.filter(registro => registro.situacao === 'PAGA');
        const vencidas = this.registros.filter(registro => registro.situacao === 'VENCIDA');

        const total = this.registros.length;

        this.resumo = [
            { label: 'Despesas', color: '#fed7aa', value: (despesas.length / total) * 100 },
            { label: 'Receitas', color: '#34d399', value: (receitas.length / total) * 100 },
            { label: 'Pendentes', color: '#c084fc', value: (pendentes.length / total) * 100 },
            { label: 'Pagas', color: '#15803d', value: (pagas.length / total) * 100 },
            { label: 'Vencidas', color: '#c2410c', value: (vencidas.length / total) * 100 },
        ];
    },
    data() {
        return {
            registros: [],
            resumo: []
        }
    },
    methods: {
        exportar() {
        }
    }
}
</script>

<style>
.button-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px
}

.resumo {
    font-size: 13px;
    margin-bottom: 5px
}
</style>