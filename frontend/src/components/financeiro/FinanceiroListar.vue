<template>
    <div>

        <div class="button-container">

            <div class="item">
                <FinanceiroResumo v-if="financeiroStore.financeiroLista.length > 0" />
            </div>
            <div class="item">
                <Button label="Novo registro financeiro" @click="financeiroStore.novo()" size="small" />
            </div>
        </div>

        <FinanceiroBarraDePesquisa />

        <div class="resumo" v-if="financeiroStore.financeiroLista.length > 0">
            <MeterGroup :value="resumo" />
        </div>

        <ScrollPanel v-if="financeiroStore.financeiroLista.length > 0" style="width: 100%; height: 675px" :dt="{
            bar: {
                background: '#000000'
            }
        }">
            <DataTable v-model:selection="selectedProduct" :value="financeiroStore.financeiroLista" :size="size" selectionMode="single"
                @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" :metaKeySelection="metaKey" dataKey="uuid"
                stripedRows tableStyle="min-width: 50rem">
                <Column sortable field="categoria" header="Categoria">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.categoria === 'RECEITA'" severity="success" value="Receita"></Tag>
                        <Tag v-else-if="slotProps.data.categoria === 'DESPESA'" severity="warn" value="Despesa"></Tag>
                    </template>
                </Column>

                <Column sortable field="descricao" header="Descrição"></Column>
                <Column sortable field="data_vencimento" header="Vencimento">
                    <template #body="slotProps">
                        {{ $moment.format(slotProps.data.data_vencimento) }}
                    </template>
                </Column>
                <Column sortable field="data_pagamento" header="Pagamento">
                    <template #body="slotProps">
                        {{ $moment.format(slotProps.data.data_pagamento) }}
                    </template>
                </Column>
                <Column sortable field="vencida" header="Vencida">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.vencida ? 'Sim' : 'Não'"></Tag>
                    </template>
                </Column>

                <Column sortable field="valor_total" header="Valor">
                    <template #body="slotProps">
                        {{ this.formatarReal(slotProps.data.valor_total) }}
                    </template>
                </Column>
                <Column sortable field="situacao" header="Situação">
                    <template #body="slotProps">
                        <Tag v-if="slotProps.data.situacao === 'PENDENTE'" severity="warn"
                            :value="slotProps.data.situacao">
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
        </ScrollPanel>

        <el-empty v-else description="Não existem registros financeios cadastrados." />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import FinanceiroFormulario from './FinanceiroFormulario.vue'
import FinanceiroResumo from './FinanceiroResumo.vue'
import { formatarReal } from '@/common/util.ts';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import MeterGroup from 'primevue/metergroup';
import SelectButton from 'primevue/selectbutton';
import ScrollPanel from 'primevue/scrollpanel';
import FinanceiroBarraDePesquisa from './FinanceiroBarraDePesquisa.vue';

dayjs.extend(customParseFormat);

export default {
    components: {
        FinanceiroFormulario,
        FinanceiroResumo,
        DataTable,
        Column,
        Tag,
        Button,
        MeterGroup,
        SelectButton,
        ScrollPanel,
        FinanceiroBarraDePesquisa
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
        financeiroStore.financeiroLista = await this.financeiroStore.listar();
        const despesas = financeiroStore.financeiroLista.filter(registro => registro.categoria === 'DESPESA');
        const receitas = financeiroStore.financeiroLista.filter(registro => registro.categoria === 'RECEITA');

        const pendentes = financeiroStore.financeiroLista.filter(registro => registro.situacao === 'PENDENTE');
        const pagas = financeiroStore.financeiroLista.filter(registro => registro.situacao === 'PAGA');
        const vencidas = financeiroStore.financeiroLista.filter(registro => registro.situacao === 'VENCIDA');

        const total = financeiroStore.financeiroLista.length;

        this.resumo = [
            { label: 'Despesas', color: '#fed7aa', value: (despesas.length / total) * 100 },
            { label: 'Receitas', color: '#0ea5e9', value: (receitas.length / total) * 100 },
            { label: 'Pendentes', color: '#c084fc', value: (pendentes.length / total) * 100 },
            { label: 'Pagas', color: '#34d399', value: (pagas.length / total) * 100 },
            { label: 'Vencidas', color: '#c2410c', value: (vencidas.length / total) * 100 },
        ];
    },
    data() {
        return {
            resumo: [],
            size: null,
            selectedProduct: null
        }
    },

    methods: {
        alterarTamanhoTabela(size) {
            this.size = size;
        },
        onRowSelect(event) {
            this.financeiroStore.exibir(event.data.uuid)
        },
        onRowUnselect(event) {
            this.$toast.add({ severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000 });
        }
    }
}
</script>

<style>
.button-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 5px;
}

.resumo {
    font-size: 13px;
    margin-bottom: 5px
}
</style>