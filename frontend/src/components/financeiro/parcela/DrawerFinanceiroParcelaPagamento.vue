<template>
    <el-drawer v-model="financeiroStore.modalConfirmacaoPagamento.exibir" title="Registrar Pagamento"
        :direction="direction" :before-close="handleClose">
        <el-form-item label="">
            <el-col :span="11">
                <b>Financeiro</b>
            </el-col>
            <el-col :span="11">
                {{ financeiroStore.financeiro.descricao }}
            </el-col>
        </el-form-item>

        <el-form-item label="">
            <el-col :span="11">
                <b>Parcela</b>
            </el-col>
            <el-col :span="11">
                {{ financeiroStore.parcela_selecionada.parcela }} de
                {{ financeiroStore.financeiro.numero_parcelas }}
            </el-col>
        </el-form-item>

        <el-form-item label="">
            <el-col :span="11">
                <b>Valor R$</b>
            </el-col>
            <el-col :span="11">
                {{ financeiroStore.parcela_selecionada.valor }}
            </el-col>
        </el-form-item>

        <el-form-item label="">
            <el-col :span="11">
                <b>Vencimento</b>
            </el-col>
            <el-col :span="11">
                {{ financeiroStore.parcela_selecionada.data_vencimento }}
            </el-col>
        </el-form-item>


        <el-form-item label="">
            <el-col :span="11">
                <b>Data de Pagamento</b>
            </el-col>
            <el-col :span="11">
                <el-date-picker format="DD/MM/YYYY" value-format="DD/MM/YYYY" @change="habilitarBotaoConfirmar()"
                    v-model="financeiroStore.modalConfirmacaoPagamento.data_pagamento" type="date"
                    style="width: 100%;" />
            </el-col>
        </el-form-item>


        <el-collapse accordion>
            <el-collapse-item name="1">
                <template #title>
                    Adicionar Observação <el-icon class="header-icon">
                        <info-filled />
                    </el-icon>
                </template>
                <el-input v-model="financeiroStore.parcela_selecionada.observacao" style="width: 100%" :rows="4"
                    type="textarea" placeholder="Observação..." />

            </el-collapse-item>
        </el-collapse>


        <div class="dropbox" :style="financeiroStore.modalConfirmacaoPagamento.backgroundStyle">
            <input type="file" name="comprovante" @change="filesChange($event.target.files);" class="input-file">
            <p>
                {{ financeiroStore.modalConfirmacaoPagamento.instrucao }}
            </p>
        </div>

        <q-card-actions align="right">
            <el-button @click="financeiroStore.modalConfirmacaoPagamento.exibir = false">Cancelar</el-button>
            <el-button :disabled="financeiroStore.modalConfirmacaoPagamento.btnConfirmar" type="success"
                @click="confirmar()">
                Confirmar
            </el-button>
        </q-card-actions>
    </el-drawer>
</template>

<script>
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum';
import { upload } from "@/api/index"

export default {
    setup() {
        const financeiroStore = FinanceiroStore();
        return { financeiroStore };
    },
    methods: {
        async filesChange(comprovante) {
            this.financeiroStore.modalConfirmacaoPagamento.comprovante = comprovante
            this.formData = new FormData();
            this.formData.append('financeiro_uuid', this.financeiroStore.financeiro.uuid);
            this.formData.append('parcela', this.financeiroStore.parcela_selecionada.parcela);
            this.formData.append('situacao', FinanceiroSituacaoEnum.PAGA);
            this.formData.append('data_pagamento', this.financeiroStore.modalConfirmacaoPagamento.data_pagamento);
            this.formData.append('observacao', this.financeiroStore.parcela_selecionada.observacao);
            this.formData.append('comprovante', comprovante[0]);
            this.financeiroStore.modalConfirmacaoPagamento.instrucao = "Comprovante selecionado"
            this.financeiroStore.modalConfirmacaoPagamento.backgroundStyle = 'background: #67c23a'
            await this.habilitarBotaoConfirmar()
        },
        async confirmar() {
            await upload('financeiro/parcela/alterar-situacao', this.formData)
            this.financeiroStore.modalConfirmacaoPagamento.exibir = false
            this.financeiroStore.exibir(this.financeiroStore.financeiro.uuid)
        },
        async habilitarBotaoConfirmar() {
            if (this.financeiroStore.modalConfirmacaoPagamento.data_pagamento != null && this.financeiroStore.modalConfirmacaoPagamento.comprovante != null) {
                this.financeiroStore.modalConfirmacaoPagamento.btnConfirmar = false
            } else {
                this.financeiroStore.modalConfirmacaoPagamento.btnConfirmar = true
            }
        }
    },
}
</script>

<style>
.dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: #ff9800;
    color: #ffffff;
    padding: 10px 10px;
    min-height: 50px;
    position: relative;
    cursor: pointer;
    width: 100%;
}

.input-file {
    opacity: 0;
    width: 100%;
    height: 50px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: #ff9800;
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}

.el-picker__popper {
    z-index: 2001 !important;
}
</style>