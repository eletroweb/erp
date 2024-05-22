<template>
    <div class="row">

        <DialogoDespesaParcelaPagamento />

        <div class="col">
            <el-table :data="despesa.parcelas" stripe>
                <el-table-column prop="item" label="Parcela" width="100">
                    <template #default="item">
                        <center>
                            {{ item.row.parcela }}/{{ this.despesa.numero_parcelas }}
                        </center>
                    </template>
                </el-table-column>

                <el-table-column prop="data_vencimento" label="Vencimento" width="120" />

                <el-table-column prop="valor" label="Valor" width="200">
                    <template #default="valor">
                        {{ formatarReal(valor.row.valor * 100) }}
                    </template>
                </el-table-column>

                <el-table-column prop="situacao" label="Situação" width="200">
                    <template #default="situacao">
                        <q-badge :color="getCorPorSituacao(situacao.row.situacao)">
                            {{ situacao.row.situacao }}
                        </q-badge>
                    </template>
                </el-table-column>

                <el-table-column prop="acoes" label="Ações" width="200">
                    <template #default="acoes">
                        <span v-if="isPending(acoes.row.situacao) && despesa.uuid != null">
                            <el-button @click="despesaStore.exibirModalPagamento(acoes.row.parcela)" size="small">
                                Pagar
                            </el-button>
                        </span>
                        <span v-else-if="isPaid(acoes.row.situacao)">
                            <el-button @click="despesaStore.downloadComprovante(acoes.row)" size="small">
                                Comprovante
                            </el-button>
                        </span>

                    </template>
                </el-table-column>

                <el-table-column prop="observacao" label="Observação" width="150" />

            </el-table>
        </div>
    </div>
</template>

<script>
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum'
import DialogoDespesaParcelaPagamento from '@/components/financeiro/despesa/parcela/DialogoDespesaParcelaPagamento.vue'
import { DespesaStore } from '@/store/financeiro/DespesaStore.ts'

export default {
    props: {
        despesa: {
            // type: [Number, String],
            required: true
        }
    },
    setup(props) {
        const despesaStore = DespesaStore();
        return { despesaStore, formatarReal, getCorPorSituacao }
    },
    components: {
        DialogoDespesaParcelaPagamento
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