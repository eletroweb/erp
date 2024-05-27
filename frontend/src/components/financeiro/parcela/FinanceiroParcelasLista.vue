<template>
    <div class="row">

        <!-- DialogoFinanceiroParcelaPagamento /-->
        <DrawerFinanceiroParcelaPagamento />

        <div class="col">
            <el-table :data="financeiro.parcelas" stripe>
                <el-table-column prop="item" label="Parcela" width="100">
                    <template #default="item">
                        <center>
                            {{ item.row.parcela }}/{{ this.financeiro.numero_parcelas }}
                        </center>
                    </template>
                </el-table-column>


                <el-table-column prop="data_vencimento" label="Vencimento" width="120">
                    <template #default="item">
                        {{ item.row.data_vencimento }}
                    </template>
                </el-table-column>

                <el-table-column prop="data_pagamento" label="Pagamento" width="120">
                    <template #default="item">
                        {{ item.row.data_pagamento ? item.row.data_pagamento : '-' }}
                    </template>
                </el-table-column>

                <el-table-column prop="valor" label="Valor" width="200">
                    <template #default="valor">
                        {{ formatarReal(valor.row.valor) }}
                    </template>
                </el-table-column>

                <el-table-column prop="situacao" label="" width="30">
                    <template #default="situacao">
                        <el-popover placement="top-start" title="Observação" :width="200" trigger="hover"
                            :content="situacao.row.observacao">
                            <template #reference>
                                <el-icon v-if="situacao.row.observacao">
                                    <InfoFilled />
                                </el-icon>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column prop="situacao" label="Situação" width="150">
                    <template #default="situacao">
                        <q-badge value="new" :color="getCorPorSituacao(situacao.row.situacao)">
                            {{ situacao.row.situacao }}
                        </q-badge>
                    </template>
                </el-table-column>

                <el-table-column prop="acoes" label="Ações" width="250">
                    <template #default="acoes">
                        <span v-if="isPending(acoes.row.situacao) && financeiro.uuid != null">
                            <el-button @click="financeiroStore.exibirModalPagamento(acoes.row.parcela)" size="small">
                                Pagar
                            </el-button>
                        </span>
                        <span v-else-if="isPaid(acoes.row.situacao)">
                            <el-button @click="financeiroStore.downloadComprovante(acoes.row)" size="small">
                                Comprovante
                            </el-button>
                        </span>

                    </template>
                </el-table-column>


            </el-table>
        </div>
    </div>
</template>

<script>
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum'
import DialogoFinanceiroParcelaPagamento from '@/components/financeiro/parcela/DialogoFinanceiroParcelaPagamento.vue'
import DrawerFinanceiroParcelaPagamento from '@/components/financeiro/parcela/DrawerFinanceiroParcelaPagamento.vue'
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'

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
        DialogoFinanceiroParcelaPagamento,
        DrawerFinanceiroParcelaPagamento
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
</script>@/store/financeiro/FinanceiroStore