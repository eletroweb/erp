<template>
    <el-form :model="atividadeStore.atividade" label-width="120px">

        <el-form-item label="Descrição">
            <el-input v-model="atividadeStore.atividade.descricao" name="responsavel" id="responsavel" />
        </el-form-item>

        <el-form-item label="Setor">
            <el-radio-group v-model="atividadeStore.atividade.setor.uuid" class="ml-4" name="setor">
                <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                    <el-radio ce :label="setor.uuid" size="large">
                        {{ setor.descricao }}
                    </el-radio>
                </div>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="Início">
            <el-col :span="5">
                <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="atividadeStore.atividade.data_inicio"
                    type="date" placeholder="Data Início" style="width: 100%" />
            </el-col>
            <el-col :span="2">
                <span style=" margin-left: 18px;">
                    Fim
                </span>
            </el-col>
            <el-col :span="5">
                <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="atividadeStore.atividade.data_fim" type="date"
                    placeholder="Data Fim" style="width: 100%" />
            </el-col>
        </el-form-item>

        <el-form-item label="Observação">
            <el-input v-model="atividadeStore.atividade.observacao" type="textarea" name="observacao" id="observacao" />
        </el-form-item>

        <el-form-item label="Situação">
            <el-switch v-model="atividadeStore.atividade.situacao" />
        </el-form-item>

        <el-form-item>
            <el-button  type="primary" @click="atividadeStore.cadastrar()">
                Salvar
            </el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import { SetorStore } from '../../store/SetorStore'

export default {
    name: "ProjetoAtividadesFormulario",
    props: ['projeto'],
    setup() {
        const atividadeStore = ProjetoAtividadesStore()
        return { atividadeStore }
    },
    async mounted() {
        const setorStore = SetorStore()
        this.setores = await setorStore.listar();  
    },
    components: {
    },
    methods: {
        tableRowClassName(rowIndex) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return ''
        }
    }
}
</script>

<style>
.card-header {
    position: relative;
    height: 50px;
}

.btnCadastrar {
    position: absolute;
    right: 0;
}
</style>