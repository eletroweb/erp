<template>
    <div class="q-pa-md">
        <q-table id="receitas" virtual-scroll style="height: 700px" :rows-per-page-options="[12]" :filter="filter"
            :rows="receitaStore.receitas" :columns="columns" flat no-data-label="Não existem receitas lançadas"
            no-results-label="Nenhum registro localizado" bordered title="Receitas" row-key="name">

            <template v-slot:top-right>

                <q-btn size="md" color="primary" label="Cadastrar Receita" no-caps @click="receitaStore.novo()" />

                <q-btn flat size="md" color="primary" icon-right="archive" label="Exportar csv" no-caps
                    @click="exportTable" />

                <q-input borderless dense debounce="300" v-model="filter" placeholder="Busca">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props" @click="receitaStore.exibir(props.row.uuid)">
                    <q-td key="descricao" :props="props">
                        {{ props.row.descricao }}
                    </q-td>

                    <q-td key="situacao" :props="props">
                        <q-badge :color="receitaStore.getCorPorSituacao(props.row.situacao)">{{ props.row.situacao
                            }}</q-badge>
                    </q-td>

                    <q-td key="descricao" :props="props" style="text-align: right;">
                        {{ props.row.valor_cobranca }}
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
                                        <q-item-section side>
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
import { exportFile } from 'quasar'
import { ReceitaStore } from '@/store/financeiro/ReceitaStore.ts'
import ReceitaFormulario from './ReceitaFormulario.vue'

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
        const receitaStore = ReceitaStore()
        receitaStore.listar()


        const valor = ref('');

        // Aplicar a máscara R$
        const formattedValue = ref('');

        watch(valor, (newValue) => {
            // Verificar se o valor é numérico
            if (!isNaN(newValue)) {
                // Formatando o valor
                formattedValue.value = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(newValue);
            } else {
                // Limpar o valor se não for numérico
                formattedValue.value = '';
            }
        });
        return {
            receitaStore, filter: ref(''), valor,
            formattedValue
        }
    },
    components: {
        ReceitaFormulario
    },
    data() {
        return {
            columns: [
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
        exportTable() {
            // naive encoding to csv format
            const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
                this.rows.map(row => this.columns.map(col => wrapCsvValue(
                    typeof col.field === 'function'
                        ? col.field(row)
                        : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                )).join(','))
            ).join('\r\n')

            const status = exportFile(
                'table-export.csv',
                content,
                'text/csv'
            )

            if (status !== true) {
                $q.notify({
                    message: 'Browser denied file download...',
                    color: 'negative',
                    icon: 'warning'
                })
            }
        }
    }
}
</script>

<style>
#receitas table tr {
    cursor: pointer
}
</style>