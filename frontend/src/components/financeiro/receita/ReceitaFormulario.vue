<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    {{ receitaStore.receita.descricao }}
                    <div class="toolBar">
                        <el-button v-if="receitaStore.receita.uuid == null" type="primary"
                            @click="receitaStore.cadastrar()">
                            Salvar
                        </el-button>

                        <el-button v-else type="primary" @click="receitaStore.editar(receitaStore.receita.uuid)">
                            Salvar alterações
                        </el-button>
                        <el-button type="default" @click="receitaStore.cancelar()">Cancelar</el-button>


                        <!-- el-button type="danger" v-if="receitaStore.receita.uuid != null"
                            @click="receitaStore.excluir(receitaStore.receita.uuid)">Excluir</el-button -->
                    </div>

                </div>
            </template>

            <el-alert v-if="receitaStore.receita.vencida" title="ATENÇÃO: Essa receita possui parcela(s) vencida(s)"
                :closable="false" type="warning" show-icon />
            <br>

            <q-badge v-if="receitaStore.receita.uuid != null" id="situacao_resumo"
                :color="getCorPorSituacao(receitaStore.receita.situacao)">{{
                        receitaStore.receita.situacao
                    }}</q-badge>

            <q-form class="q-gutter-md">

                <el-form-item label="Descrição">
                    <el-col :span="11">
                        <el-form-item label="">
                            <el-input :disabled="situacaoArquivado()" v-model="receitaStore.receita.descricao"
                                name="descricao" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item label="" style="margin-left: 20px;">
                            <q-radio v-model="receitaStore.receita.tipo" val="FIXA"
                                label="Fixa" />
                            <q-radio v-model="receitaStore.receita.tipo" val="VARIAVEL"
                                label="Variável" />
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="Fornecedor">
                    <el-col :span="11">
                        <el-form-item label="">
                            <el-input :disabled="situacaoArquivado()" v-model="receitaStore.receita.fornecedor"
                                name="descricao" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <el-form-item v-if="receitaStore.receita.uuid != null" label="" style="margin-left: 20px;">
                            <q-btn-toggle v-model="receitaStore.receita.situacao" class="situacao-toggle" no-caps
                                rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
                        { label: 'PAGA', value: 'PAGA', disable: receitaStore.receita.todas_parcelas_pagas == false || receitaStore.receita.uuid === null },
                        { label: 'PENDENTE', value: 'PENDENTE', disable: situacaoPendente() },
                        { label: 'VENCIDA', value: 'VENCIDA', disable: situacaoVencida() },
                        { label: 'ARQUIVADO', value: 'ARQUIVADO', disable: receitaStore.receita.uuid === null }
                    ]" />
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="Data de Vencimento">
                    <el-col :span="4">
                        <el-date-picker :disabled="situacaoArquivado()" format="DD/MM/YYYY"
                            v-model="receitaStore.receita.data_vencimento" type="date" style="width: 100%" />
                    </el-col>
                    <el-col :span="4">
                        <span style=" margin-left: 18px;">
                            Valor da Cobrança
                        </span>
                    </el-col>
                    <el-col :span="5">
                        <el-input 
                        @blur="selecionarNumeroDeParcelas"
                        :readonly="receitaStore.receita.uuid != null"
                            :disabled="receitaStore.receita.uuid != null" v-model="receitaStore.receita.valor_cobranca"
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
                        {{ receitaStore.receita.valor_pago }}
                    </el-col>
                </el-form-item>

                <el-form-item label="Data de Pagamento">
                    <el-col :span="5">
                        <el-date-picker :disabled="situacaoArquivado()" format="DD/MM/YYYY"
                            v-model="receitaStore.receita.data_pagamento" type="date" style="width: 100%" />
                    </el-col>
                    <el-col :span="4">
                        <span style=" margin-left: 18px;">
                            Número de Parcelas
                        </span>
                    </el-col>
                    <el-col :span="2">
                        <el-select name="numero_parcelas"
                            @change="selecionarNumeroDeParcelas()" v-model="receitaStore.receita.numero_parcelas"
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

                <ReceitaParcelasLista :receita="receitaStore.receita" />

                <div class="row">
                    <div class="col">
                        <q-input :disable="situacaoArquivado()" filled type="textarea"
                            v-model="receitaStore.receita.observacao" label="Observação" lazy-rules />
                    </div>
                </div>
            </q-form>
        </el-card>
    </div>
</template>

<script>
import { ReceitaStore } from '@/store/financeiro/ReceitaStore.ts'
import dayjs from 'dayjs'
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum'
import ReceitaParcelasLista from '@/components/financeiro/receita/parcela/ReceitaParcelasLista.vue'
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';

export default {
    name: "ReceitaFormulario",
    setup() {
        const receitaStore = ReceitaStore();

        const formatarMoeda = (campo) => {
            let valor = receitaStore.receita[campo];

            valor = valor.replace(/\D/g, '');

            if (!valor) return;

            const formattedValue = parseFloat(valor) / 100;
            const valorFormatado = formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            receitaStore.receita[campo] = valorFormatado;
        };

        return { receitaStore, formatarMoeda, formatarReal, getCorPorSituacao };
    },
    data() {
        return {
        }
    },
    components: {
        ReceitaParcelasLista
    },
    async mounted() {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.receitaStore.carregarReceita(this.id)
        } else {
            
        }
        this.receitaStore.receita.numero_parcelas = 1
        this.selecionarNumeroDeParcelas()
    },
    methods: {
        situacaoPendente() {
            return this.receitaStore.receita.todas_parcelas_pagas == true ||
                this.receitaStore.receita.situacao === FinanceiroSituacaoEnum.VENCIDA
        },
        situacaoVencida() {
            return this.receitaStore.receita.todas_parcelas_pagas == true ||
                this.receitaStore.receita.situacao === FinanceiroSituacaoEnum.PENDENTE
        },
        situacaoArquivado() {
            return [
                FinanceiroSituacaoEnum.ARQUIVADO,
                FinanceiroSituacaoEnum.PAGA
            ].includes(this.receitaStore.receita.situacao)
        },
        podeParcelar(situacao) {
            return [
                FinanceiroSituacaoEnum.VENCIDA,
                FinanceiroSituacaoEnum.PENDENTE
            ].includes(situacao)
        },
        selecionarNumeroDeParcelas() {
            const { numero_parcelas, valor_cobranca } = this.receitaStore.receita
            const valor = valor_cobranca / numero_parcelas
            let parcelaInicial = 1
            const situacao = FinanceiroSituacaoEnum.PENDENTE;
            this.receitaStore.receita.parcelas = []
            if (numero_parcelas === 1) {
                this.receitaStore.receita.parcelas.push({
                    parcela: parcelaInicial,
                    valor,
                    situacao
                })
            } else {
                let data_vencimento = dayjs(this.receitaStore.receita.data_vencimento)
                for (let parcela = 0; parcela < numero_parcelas; parcela++) {
                    data_vencimento = data_vencimento.add(1, 'month')

                    this.receitaStore.receita.parcelas.push({
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
</style>@/store/financeiro/ReceitaStore