<template>
    <q-dialog v-model="receitaStore.modalConfirmacaoPagamento" persistent>
        <q-card>

            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 23px;">Registrar Pagamento
                        </span>
                    </div>
                </template>

                <el-form-item label="">
                    <el-col :span="11">
                        <b>Receita</b>
                    </el-col>
                    <el-col :span="11">
                        {{ receitaStore.receita.descricao }}
                    </el-col>
                </el-form-item>

                <el-form-item label="">
                    <el-col :span="11">
                        <b>Parcela</b>
                    </el-col>
                    <el-col :span="11">
                        {{ receitaStore.parcela_selecionada.parcela }} de
                        {{ receitaStore.receita.numero_parcelas }}
                    </el-col>
                </el-form-item>

                <el-form-item label="">
                    <el-col :span="11">
                        <b>Valor R$</b>
                    </el-col>
                    <el-col :span="11">
                        {{ receitaStore.parcela_selecionada.valor }}
                    </el-col>
                </el-form-item>

                <el-form-item label="">
                    <el-col :span="11">
                        <b>Vencimento</b>
                    </el-col>
                    <el-col :span="11">
                        {{ receitaStore.parcela_selecionada.data_vencimento }}
                    </el-col>
                </el-form-item>

                <div class="dropbox">
                    <input type="file" name="comprovante" @change="filesChange($event.target.files);"
                        class="input-file">

                    <p>
                        Selecione o comprovante
                    </p>
                </div>

            </el-card>

            <q-card-actions align="right">
                <el-button @click="receitaStore.modalConfirmacaoPagamento = false">Cancelar</el-button>
                <el-button :disabled="btnConfirmar" type="success" @click="confirmar()">
                    Confirmar
                </el-button>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { ReceitaStore } from '@/store/financeiro/ReceitaStore.ts'
import { FinanceiroSituacaoEnum } from '@/enum/financeiro.enum';
import { upload } from "@/api/index"

export default {
    setup() {
        const receitaStore = ReceitaStore();
        return { receitaStore };
    },
    data(){
        return {
            btnConfirmar: true,
            formData: null
        }
    },
    methods: {
        async filesChange(comprovante) {
            this.formData = new FormData();
            this.formData.append('receita_uuid', this.receitaStore.receita.uuid);
            this.formData.append('parcela', this.receitaStore.parcela_selecionada.parcela);
            this.formData.append('situacao', FinanceiroSituacaoEnum.PAGA);
            this.formData.append('comprovante', comprovante[0]);
            this.btnConfirmar = false
        },
        async confirmar(){
            await upload('receitas/parcela/alterar-situacao', this.formData)
            this.receitaStore.modalConfirmacaoPagamento = false
            this.receitaStore.exibir(this.receitaStore.receita.uuid)
            this.btnConfirmar = true
        }
    },
}
</script>

<style>
.dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 50px;
    position: relative;
    cursor: pointer;
    width: 350px;
}

.input-file {
    opacity: 0;
    width: 100%;
    height: 50px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: lightblue;
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
</style>