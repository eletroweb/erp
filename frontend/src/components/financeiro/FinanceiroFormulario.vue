<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    Registro Financeiro: {{ financeiroStore.financeiro.descricao }}
                    <div class="toolBar">
                        <el-button v-if="financeiroStore.financeiro.uuid == null" type="primary"
                            @click="financeiroStore.cadastrar()">
                            Salvar
                        </el-button>

                        <el-button v-else type="primary"
                            @click="financeiroStore.editar(financeiroStore.financeiro.uuid)">
                            Salvar alterações
                        </el-button>
                        <el-button type="default" @click="financeiroStore.cancelar()">Cancelar</el-button>


                        <el-popover :visible="exibirConfirmacaoExclusao" placement="top" :width="200">
                            <p>Deseja confirma a exclusão deste registro?
                                <el-tag type="danger">
                                    {{ financeiroStore.financeiro.descricao }}
                                </el-tag>
                            </p>
                            <div style="text-align: right; margin: 0; display: flex;">
                                <el-button size="small" type="primary" plain
                                    @click="exibirConfirmacaoExclusao = false">Cancelar</el-button>
                                <el-button size="small" type="danger"
                                    @click="financeiroStore.excluir(financeiroStore.financeiro.uuid)">Confirmar</el-button>
                            </div>
                            <template #reference>
                                <el-button type="danger" @click="exibirConfirmacaoExclusao = true">Excluir</el-button>
                            </template>
                        </el-popover>
                    </div>
                </div>
            </template>

            <el-alert v-if="financeiroStore.financeiro.vencida"
                title="ATENÇÃO: Essa financeiro possui parcela(s) vencida(s)" :closable="false" type="warning"
                show-icon />
            <br>

            <q-badge v-if="financeiroStore.financeiro.uuid != null" id="situacao_resumo"
                :color="getCorPorSituacao(financeiroStore.financeiro.situacao)">{{
                    financeiroStore.financeiro.situacao
                }}</q-badge>


            <el-row :gutter="24">

                <el-col :span="5">
                    <q-btn-toggle v-model="financeiroStore.financeiro.categoria" no-caps rounded unelevated
                        toggle-color="primary" color="white" text-color="primary" :options="[
                            { label: 'DESPESA', value: 'DESPESA' },
                            { label: 'RECEITA', value: 'RECEITA' },
                        ]" />
                </el-col>

                <el-col :span="5" v-if="financeiroStore.financeiro.categoria == 'DESPESA'">
                    <el-select @change="financeiroStore.selecionarTipoCentroDeCusto()"
                        v-model="financeiroStore.financeiro.centro_custo" placeholder="Centro de Custo..." size="large">
                        <el-option v-for="item in centroDeCustoLista" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="6" v-if="financeiroStore.financeiro.categoria == 'DESPESA' || centroDeCusto != null">
                    <SelectSetores v-if="financeiroStore.financeiro.centro_custo == 'SETOR'" v-model="setorUuid" />
                    <SelectContratos v-else-if="financeiroStore.financeiro.centro_custo == 'CONTRATO'"
                        v-model="contratoUuid" />
                </el-col>

                <el-col :span="6">
                    <q-radio v-model="financeiroStore.financeiro.tipo" val="FIXA" label="Fixa" />
                    <q-radio v-model="financeiroStore.financeiro.tipo" val="VARIAVEL" label="Variável" />
                </el-col>
            </el-row>

            <el-form-item label="">
                <el-col :span="12">
                    <el-form-item label="Descrição">
                        <el-input v-model="financeiroStore.financeiro.descricao" name="descricao" />
                    </el-form-item>
                </el-col>

                <el-col :span="10" style="margin-left: 20px;">
                    <el-form-item label="Fornecedor">
                        <el-input v-model="financeiroStore.financeiro.fornecedor" name="descricao" />
                    </el-form-item>
                </el-col>

            </el-form-item>

            <q-form class="q-gutter-md">
                <el-form-item label="">
                    <el-col :span="13">
                        <el-form-item v-if="financeiroStore.financeiro.uuid != null" label=""
                            style="margin-left: 20px;">
                            <q-btn-toggle v-model="financeiroStore.financeiro.situacao" class="situacao-toggle" no-caps
                                rounded unelevated toggle-color="primary" color="white" text-color="primary" :options="[
                                    { label: 'PAGA', value: 'PAGA', disable: financeiroStore.financeiro.todas_parcelas_pagas == false || financeiroStore.financeiro.uuid === null },
                                    { label: 'PENDENTE', value: 'PENDENTE', disable: situacaoPendente() },
                                    { label: 'VENCIDA', value: 'VENCIDA', disable: situacaoVencida() },
                                    { label: 'ARQUIVADO', value: 'ARQUIVADO', disable: financeiroStore.financeiro.uuid === null }
                                ]" />
                        </el-form-item>
                    </el-col>
                </el-form-item>

                <el-form-item label="Data de Vencimento">
                    <el-col :span="4">
                        <el-date-picker format="DD/MM/YYYY" v-model="financeiroStore.financeiro.data_vencimento"
                            type="date" style="width: 100%" />
                    </el-col>
                    <el-col :span="5">
                        <span style=" margin-left: 18px;">
                            Valor da Cobrança
                        </span>
                    </el-col>
                    <el-col :span="5">
                        <money3 v-model="financeiroStore.financeiro.valor_cobranca" @blur="selecionarNumeroDeParcelas"
                            v-bind="config">
                        </money3>
                    </el-col>
                    <el-col :span="3" v-if="this.financeiroStore.financeiro.uuid != null">
                        <span style=" margin-left: 18px;">
                            Valor Pago
                        </span>
                    </el-col>
                    <el-col :span="3" style="font-size: 16px;" v-if="this.financeiroStore.financeiro.uuid != null">
                        {{ formatarReal(financeiroStore.financeiro.valor_pago * 100) }}
                    </el-col>
                </el-form-item>

                <el-form-item label="">
                    <!-- el-col :span="4">
                        <el-date-picker format="DD/MM/YYYY" v-model="financeiroStore.financeiro.data_pagamento"
                            type="date" style="width: 100%" />
                    </el-col -->
                    <el-col :span="5">
                        <span>
                            Número de Parcelas
                        </span>
                    </el-col>
                    <el-col :span="2">
                        <el-select name="numero_parcelas" @change="selecionarNumeroDeParcelas()"
                            v-model="financeiroStore.financeiro.numero_parcelas" placeholder="Selecione...">
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

                <FinanceiroParcelasLista :financeiro="financeiroStore.financeiro" />

                <div class="row">
                    <div class="col">
                        <q-input :disable="situacaoArquivado()" filled type="textarea"
                            v-model="financeiroStore.financeiro.observacao" label="Observação" lazy-rules />
                    </div>
                </div>
            </q-form>
        </el-card>
    </div>
</template>

<script>
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import dayjs from 'dayjs'
import { FinanceiroSituacaoEnum, FinanceiroCentroDeCustoEnum } from '@/enum/financeiro.enum'
import FinanceiroParcelasLista from '@/components/financeiro/parcela/FinanceiroParcelasLista.vue'
import { formatarReal, getCorPorSituacao } from '@/common/util.ts';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Money3Component } from 'v-money3'
import SelectSetores from "@/components/setores/SelectSetores.vue"
import SelectContratos from "@/components/contratos/SelectContratos.vue"
import { defineComponent, computed } from 'vue';

dayjs.extend(customParseFormat);

export default {
    name: "FinanceiroFormulario",
    setup() {
        const financeiroStore = FinanceiroStore();

        const formatarMoeda = (campo) => {
            let valor = financeiroStore.financeiro[campo];

            valor = valor.replace(/\D/g, '');

            if (!valor) return;

            const formattedValue = parseFloat(valor) / 100;
            const valorFormatado = formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            financeiroStore.financeiro[campo] = valorFormatado;
        };



        const centroDeCusto = computed(() => {
            if (financeiroStore.financeiro.setor?.uuid) {
                return FinanceiroCentroDeCustoEnum.SETOR;
            } else if (financeiroStore.financeiro.contrato?.uuid) {
                return FinanceiroCentroDeCustoEnum.CONTRATO;
            } else {
                return FinanceiroCentroDeCustoEnum.SETOR; // Valor padrão
            }
        });

        const contratoUuid = computed({
            get() {
                return financeiroStore.getContratoUuid;
            },
            set(value) {
                financeiroStore.setContratoUuid(value);
            }
        });

        const setorUuid = computed({
            get() {
                return financeiroStore.getSetorUuid;
            },
            set(value) {
                financeiroStore.setSetorUuid(value);
            }
        });


        return { financeiroStore, formatarMoeda, formatarReal, getCorPorSituacao, contratoUuid, setorUuid };
    },
    data() {
        return {
            exibirConfirmacaoExclusao: false,
            centroDeCustoLista: [
                { value: FinanceiroCentroDeCustoEnum.SETOR, label: 'Setor', },
                { value: FinanceiroCentroDeCustoEnum.CONTRATO, label: 'Contrato' },
            ],
            config: {
                masked: false,
                prefix: '',
                suffix: '',
                thousands: '.',
                decimal: ',',
                precision: 2,
                disableNegative: false,
                disabled: false,
                min: null,
                max: null,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            }
        }
    },
    components: {
        FinanceiroParcelasLista,
        money3: Money3Component,
        SelectSetores,
        SelectContratos
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
        situacaoPendente() {
            return this.financeiroStore.financeiro.todas_parcelas_pagas == true ||
                this.financeiroStore.financeiro.situacao === FinanceiroSituacaoEnum.VENCIDA
        },
        situacaoPaga() {
            return this.financeiroStore.financeiro.situacao === FinanceiroSituacaoEnum.PAGA
        },
        situacaoVencida() {
            return this.financeiroStore.financeiro.todas_parcelas_pagas == true ||
                this.financeiroStore.financeiro.situacao === FinanceiroSituacaoEnum.PENDENTE
        },
        situacaoArquivado() {
            return [
                FinanceiroSituacaoEnum.ARQUIVADO,
                FinanceiroSituacaoEnum.PAGA
            ].includes(this.financeiroStore.financeiro.situacao)
        },
        podeParcelar(situacao) {
            return [
                FinanceiroSituacaoEnum.VENCIDA,
                FinanceiroSituacaoEnum.PENDENTE
            ].includes(situacao)
        },
        selecionarNumeroDeParcelas() {
            const { numero_parcelas, valor_cobranca } = this.financeiroStore.financeiro
            const valor = valor_cobranca / numero_parcelas
            const situacao = FinanceiroSituacaoEnum.PENDENTE;

            let data_vencimento = dayjs(this.financeiroStore.financeiro.data_vencimento).format('DD/MM/YYYY')
            let parcelaInicial = 1

            this.financeiroStore.financeiro.parcelas = []

            if (numero_parcelas === 1) {
                const data_pagamento = null
                this.financeiroStore.financeiro.parcelas.push({
                    data_vencimento,
                    data_pagamento,
                    parcela: parcelaInicial,
                    valor,
                    situacao
                })
            } else {
                for (let parcela = 0; parcela < numero_parcelas; parcela++) {
                    const mesCobranca = parcela === 0 ? 0 : 1
                    data_vencimento = dayjs(data_vencimento, 'DD/MM/YYYY').add(mesCobranca, 'month').format('DD/MM/YYYY')
                    const data_pagamento = null
                    this.financeiroStore.financeiro.parcelas.push({
                        parcela: parcelaInicial,
                        valor,
                        data_vencimento,
                        data_pagamento,
                        situacao
                    })
                    parcelaInicial += 1
                }
            }
        },
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