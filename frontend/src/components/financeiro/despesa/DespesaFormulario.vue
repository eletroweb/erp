<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    {{ despesaStore.despesa.descricao }}
                    <div class="toolBar">
                        <el-button v-if="despesaStore.despesa.uuid == null" type="primary"
                            @click="despesaStore.cadastrar()">
                            Salvar
                        </el-button>

                        <el-button v-else type="primary" @click="despesaStore.editar(despesaStore.despesa.uuid)">
                            Salvar alterações
                        </el-button>
                        <el-button type="default" @click="despesaStore.cancelar()">Cancelar</el-button>


                        <!-- el-button type="danger" v-if="despesaStore.despesa.uuid != null"
                            @click="despesaStore.excluir(despesaStore.despesa.uuid)">Excluir</el-button -->
                    </div>

                </div>
            </template>

            <el-alert v-if="despesaStore.despesa.vencida" title="ATENÇÃO: Essa despesa possui parcela(s) vencida(s)"
                :closable="false" type="warning" show-icon />
            <br>

            <q-badge v-if="despesaStore.despesa.uuid != null" id="situacao_resumo"
                :color="getCorPorSituacao(despesaStore.despesa.situacao)">{{
                        despesaStore.despesa.situacao
                    }}</q-badge>

            <q-form class="q-gutter-md">

                <el-form-item label="Descrição">
                    <el-col :span="11">
                        <el-form-item label="">
                            <el-input :disabled="situacaoArquivado()" v-model="despesaStore.despesa.descricao"
                                name="descricao" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item label="" style="margin-left: 20px;">
                            <q-radio v-model="despesaStore.despesa.tipo" val="FIXA"
                                label="Fixa" />
                            <q-radio v-model="despesaStore.despesa.tipo" val="VARIAVEL"
                                label="Variável" />
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="Fornecedor">
                    <el-col :span="11">
                        <el-form-item label="">
                            <el-input :disabled="situacaoArquivado()" v-model="despesaStore.despesa.fornecedor"
                                name="descricao" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item v-if="despesaStore.despesa.uuid != null" label="" style="margin-left: 20px;">
                            <q-btn-toggle v-model="despesaStore.despesa.situacao" class="situacao-toggle" no-caps
                                rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
                        { label: 'PAGA', value: 'PAGA', disable: despesaStore.despesa.todas_parcelas_pagas == false || despesaStore.despesa.uuid === null },
                        { label: 'PENDENTE', value: 'PENDENTE', disable: situacaoPendente() },
                        { label: 'VENCIDA', value: 'VENCIDA', disable: situacaoVencida() },
                        { label: 'ARQUIVADO', value: 'ARQUIVADO', disable: despesaStore.despesa.uuid === null }
                    ]" />
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="Data de Vencimento">
                    <el-col :span="4">
                        <el-date-picker :disabled="situacaoArquivado()" format="DD/MM/YYYY"
                            v-model="despesaStore.despesa.data_vencimento" type="date" style="width: 100%" />
                    </el-col>
                    <el-col :span="4">
                        <span style=" margin-left: 18px;">
                            Valor da Cobrança
                        </span>
                    </el-col>
                    <el-col :span="5">
                        <el-input 
                        @blur="selecionarNumeroDeParcelas"
                        :readonly="despesaStore.despesa.uuid != null"
                            :disabled="despesaStore.despesa.uuid != null" v-model="despesaStore.despesa.valor_cobranca"
                            name="valor_cobranca">
                            <template #prepend>R$</template>
                        </el-input>
                    </el-col>
                    <el-col :span="3">
                        <span style=" margin-left: 18px;">
                            Valor Pago
                        </span>
                    </el-col>
                    <el-col :span="3" style="font-size: 16px;">
                        {{ formatarReal(despesaStore.despesa.valor_pago * 100) }}
                    </el-col>
                </el-form-item>

                <el-form-item label="Data de Pagamento">
                    <el-col :span="5">
                        <el-date-picker :disabled="situacaoArquivado()" format="DD/MM/YYYY"
                            v-model="despesaStore.despesa.data_pagamento" type="date" style="width: 100%" />
                    </el-col>
                    <el-col :span="5">
                        <span style=" margin-left: 18px;">
                            Número de Parcelas
                        </span>
                    </el-col>
                    <el-col :span="2">
                        <el-select name="numero_parcelas"
                            @change="selecionarNumeroDeParcelas()" v-model="despesaStore.despesa.numero_parcelas"
                            placeholder="Selecione...">
                            <el-option label="1x" value="1" />
                            <el-option label="2x" value="2" />
                            <el-option label="3x" value="3" />
                            <el-option label="4x" value="4" />
                            <el-option label="5x" value="5" />
                            <el-option label="6x" value="6" />
                            <el-option label="7x" value="7" />
                            <el-option label="8x" value="8" />
                            <el-option label="9x" value="9" />
                            <el-option label="10x" value="10" />
                            <el-option label="11x" value="11" />
                            <el-option label="12x" value="12" />
                        </el-select>
                    </el-col>
                </el-form-item>

                <DespesaParcelasLista :despesa="despesaStore.despesa" />

                <div class="row">
                    <div class="col">
                        <q-input :disable="situacaoArquivado()" filled type="textarea"
                            v-model="despesaStore.despesa.observacao" label="Observação" lazy-rules />
                    </div>
                </div>
            </q-form>
        </el-card>
    </div>
</template>

<script>
import { DespesaStore } from '@/store/financeiro/DespesaStore.ts'
import dayjs from 'dayjs'
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum'
import DespesaParcelasLista from '@/components/financeiro/despesa/parcela/DespesaParcelasLista.vue'
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';

export default {
    name: "DespesaFormulario",
    setup() {
        const despesaStore = DespesaStore();

        const formatarMoeda = (campo) => {
            let valor = despesaStore.despesa[campo];

            valor = valor.replace(/\D/g, '');

            if (!valor) return;

            const formattedValue = parseFloat(valor) / 100;
            const valorFormatado = formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            despesaStore.despesa[campo] = valorFormatado;
        };

        return { despesaStore, formatarMoeda, formatarReal, getCorPorSituacao };
    },
    data() {
        return {
        }
    },
    components: {
        DespesaParcelasLista
    },
    async mounted() {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.despesaStore.carregarDespesa(this.id)
        } else {
            
        }
        this.despesaStore.despesa.numero_parcelas = 1
        this.selecionarNumeroDeParcelas()
    },
    methods: {
        situacaoPendente() {
            return this.despesaStore.despesa.todas_parcelas_pagas == true ||
                this.despesaStore.despesa.situacao === FinanceiroSituacaoEnum.VENCIDA
        },
        situacaoVencida() {
            return this.despesaStore.despesa.todas_parcelas_pagas == true ||
                this.despesaStore.despesa.situacao === FinanceiroSituacaoEnum.PENDENTE
        },
        situacaoArquivado() {
            return [
                FinanceiroSituacaoEnum.ARQUIVADO,
                FinanceiroSituacaoEnum.PAGA
            ].includes(this.despesaStore.despesa.situacao)
        },
        podeParcelar(situacao) {
            return [
                FinanceiroSituacaoEnum.VENCIDA,
                FinanceiroSituacaoEnum.PENDENTE
            ].includes(situacao)
        },
        selecionarNumeroDeParcelas() {
            const { numero_parcelas, valor_cobranca } = this.despesaStore.despesa
            const valor = valor_cobranca / numero_parcelas
            let parcelaInicial = 1
            const situacao = FinanceiroSituacaoEnum.PENDENTE;
            this.despesaStore.despesa.parcelas = []
            if (numero_parcelas === 1) {
                this.despesaStore.despesa.parcelas.push({
                    parcela: parcelaInicial,
                    valor,
                    situacao
                })
            } else {
                let data_vencimento = dayjs(this.despesaStore.despesa.data_vencimento)
                for (let parcela = 0; parcela < numero_parcelas; parcela++) {
                    data_vencimento = data_vencimento.add(1, 'month')

                    this.despesaStore.despesa.parcelas.push({
                        parcela: parcelaInicial,
                        valor,
                        data_vencimento: data_vencimento.format('DD/MM/YYYY'),
                        situacao
                    })
                    parcelaInicial += 1
                }
            }
        }
    }
}
</script>

<style scoped>
.el-card {
    position: relative;
}

.card-header {
    font-size: 30px;
}

.toolBar {
    width: auto;
    position: absolute;
    right: 0;
    top: 0;
}

#situacao_resumo {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 9px;
    letter-spacing: 2px;
}
</style>