<template>
    <div class="q-pa-md">

        <q-table id="financeiro" virtual-scroll style="height: 730px" :rows-per-page-options="[11]" :filter="filter"
            :rows="financeiroStore.financeiroLista" :columns="columns" flat no-data-label="Não existem financeiro lançadas"
            no-results-label="Nenhum registro localizado" bordered title="Financeiro" row-key="name">

            <template v-slot:top-right>

                <q-btn size="md" color="primary" label="Novo registro financeiro" no-caps @click="financeiroStore.novo()" />

                <q-btn flat size="md" color="primary" icon-right="archive" label="Exportar csv" no-caps
                    @click="exportar" />

                <q-input borderless dense debounce="300" v-model="filter" placeholder="Busca">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props" @click="financeiroStore.exibir(props.row.uuid)">

                    <q-td key="categoria" :props="props">
                        <el-tag v-if="props.row.categoria == 'RECEITA'" type="success">  {{ props.row.categoria }}</el-tag>
                        <el-tag v-else type="warning">  {{ props.row.categoria }}</el-tag>
                    </q-td>

                    <q-td key="descricao" :props="props">
                        {{ props.row.descricao }}
                    </q-td>

                    <q-td key="situacao" :props="props">
                        <q-badge :color="financeiroStore.getCorPorSituacao(props.row.situacao)">{{ props.row.situacao
                            }}</q-badge>
                    </q-td>

                    <q-td key="descricao" :props="props" style="text-align: right;">
                        {{ this.formatarReal(props.row.valor_cobranca) }}
                    </q-td>

                    <q-td key="descricao" :props="props">
                        {{ props.row.parcelada ? 'Sim' : 'Não' }}
                    </q-td>

                    <q-td key="descricao" :props="props">
                        {{ props.row.tipo }}
                    </q-td>

                    <q-td key="descricao" :props="props">
                        {{ $moment.format(props.row.data_vencimento) }}
                    </q-td>

                    <q-td key="descricao" :props="props">
                        {{ props.row.data_pagamento ? $moment.format(props.row.data_pagamento) : '-' }}
                    </q-td>

                    <q-td key="acoes" :props="props">
                        <q-btn color="primary" label="Click me">
                            <q-menu>
                                <q-list dense style="min-width: 100px">
                                    <q-item clickable v-close-popup>
                                        <q-item-section>Open...</q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup>
                                        <q-item-section>New</q-item-section>
                                    </q-item>
                                    <q-separator />
                                    <q-item clickable>
                                        <q-item-section>Preferences</q-item-section>
                                        <q-item-section siside>
                                            <q-icon name="keyboard_arrow_right" />
                                        </q-item-section>

                                        <q-menu anchor="top end" self="top start">
                                            <q-list>
                                                <q-item v-for="n in 3" :key="n" dense clickable>
                                                    <q-item-section>Submenu Label</q-item-section>
                                                    <q-item-section side>
                                                        <q-icon name="keyboard_arrow_right" />
                                                    </q-item-section>
                                                    <q-menu auto-close anchor="top end" self="top start">
                                                        <q-list>
                                                            <q-item v-for="n in 3" :key="n" dense clickable>
                                                                <q-item-section>3rd level Label</q-item-section>
                                                            </q-item>
                                                        </q-list>
                                                    </q-menu>
                                                </q-item>
                                            </q-list>
                                        </q-menu>

                                    </q-item>
                                    <q-separator />
                                    <q-item clickable v-close-popup>
                                        <q-item-section>Quit</q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import FinanceiroFormulario from './FinanceiroFormulario.vue'
import { formatarReal } from '@/common/util.ts';
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    return `"${formatted}"`
}

export default {
    components: {
    },
    setup() {
        const financeiroStore = FinanceiroStore()
        financeiroStore.listar()
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
    components: {
        FinanceiroFormulario
    },
    data() {
        return {
            columns: [
                { name: 'categoria', label: 'Categoria', align: 'left', field: row => row.descricao, format: val => `${val}`, sortable: true },
                { name: 'descricao', label: 'Descrição', align: 'left', field: row => row.descricao, format: val => `${val}`, sortable: true },
                { name: 'situacao', label: 'Situação', align: 'left', field: row => row.descricao, format: val => `${val}`, sortable: true },
                { name: 'valor_cobranca', label: 'Valor R$', align: 'right', field: row => row.valor_cobranca, format: val => `${val}`, sortable: true },
                { name: 'parcelada', label: 'Parcelado', align: 'left', field: row => row.parcelada, format: val => `${val}`, sortable: true },
                { name: 'tipo', label: 'Tipo', align: 'left', field: row => row.tipo, format: val => `${val}`, sortable: true },
                { name: 'data_vencimento', label: 'Dt Vencimento', align: 'left', field: row => row.data_vencimento, format: val => `${val}`, sortable: true },
                { name: 'data_pagamento', label: 'Dt Pagamento', align: 'left', field: row => row.data_de_pagamento, format: val => `${val}`, sortable: true },
            ],
            rows: []
        }
    },
    methods: {
        exportar() {
        }
    }
}
</script>

<style>
#financeiro table tr {
    cursor: pointer
}
</style>