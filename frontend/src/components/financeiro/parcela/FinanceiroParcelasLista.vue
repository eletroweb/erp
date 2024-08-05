<template>
    <div class="row">

        <DrawerFinanceiroParcelaPagamento />


        <DataTable :value="financeiro.parcelas" stripedRows tableStyle="min-width: 50rem">
            <Column header="Parcela">
                <template #body="slotProps">
                    {{ slotProps.data.parcela }}/{{ financeiro.parcelas.length }}
                </template>
            </Column>

            <Column header="Vencimento">
                <template #body="slotProps">
                    {{ $moment.format(slotProps.data.data_vencimento) }}
                </template>
            </Column>

            <Column header="Pagamento">
                <template #body="slotProps">
                    {{ $moment.format(slotProps.data.data_pagamento) }}
                </template>
            </Column>

            <Column header="Valor">
                <template #body="slotProps">
                    <InputNumber v-model="slotProps.data.valor" inputId="valor_parcela" mode="currency" currency="BRL"
                        locale="pt-BR" />
                </template>
            </Column>

            <Column header="Situação">
                <template #body="slotProps">
                    <Tag :severity="getCorPorSituacao(slotProps.data.situacao)" :value="slotProps.data.situacao"></Tag>
                </template>
            </Column>

            <Column header="">
                <template #body="slotProps">
                    <span v-if="isPending(slotProps.data.situacao) && financeiro.uuid != null">
                        <Button label="Pagar" @click="financeiroStore.exibirModalPagamento(slotProps.data.parcela)"
                            severity="info" size="small" />
                    </span>
                    <span v-else-if="isPaid(slotProps.data.situacao)">
                        <Button label="Comprovante" @click="financeiroStore.downloadComprovante(slotProps.data)"
                            severity="info" size="small" />
                    </span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum'
import DrawerFinanceiroParcelaPagamento from '@/components/financeiro/parcela/DrawerFinanceiroParcelaPagamento.vue'
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import InputNumber from 'primevue/InputNumber';

export default {
    props: {
        financeiro: {
            // type: [Number, String],
            required: true
        }
    },
    setup(props) {
        const financeiroStore = FinanceiroStore();
        return { financeiroStore, formatarReal, getCorPorSituacao }
    },
    components: {
        DrawerFinanceiroParcelaPagamento,
        InputNumber
    },
    methods: {
        isPending(situacao_atual) {
            return [FinanceiroSituacaoEnum.PENDENTE, FinanceiroSituacaoEnum.VENCIDA].includes(situacao_atual)
        },
        isPaid(situacao_atual) {
            return situacao_atual == FinanceiroSituacaoEnum.PAGA
        }
    },
}
</script>

<style scoped>
thead {
    text-transform: uppercase !important;
    font-size: 10px;
}
</style>