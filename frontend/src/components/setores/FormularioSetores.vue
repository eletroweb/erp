<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Cadastrar Setor</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
                    <p>Deseja confirma a exclusão do setor
                        <el-tag type="danger">
                            {{ setorStore.setor.descricao }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="setorStore.excluir(setorStore.setor.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>
                
            </div>
        </template>

        

        <el-form :model="setorStore.setor" label-width="120px">
            <el-form-item label="Nome">
                <el-input v-model="setorStore.setor.descricao" />
            </el-form-item>
            <el-form-item label="Situação">
                <el-switch v-model="setorStore.setor.situacao" />
            </el-form-item>
            <el-form-item>

                <el-button v-if="this.id == null" type="primary" @click="setorStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="setorStore.editar(setorStore.setor.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="setorStore.cancelar()">Cancelar</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import { SetorStore } from '../../store/SetorStore'
import { ref } from 'vue'

export default {
    setup() {
        const setorStore = SetorStore()
        return { setorStore }
    },
    data() {
        return {
            confirmacaoVisivel: false,
            id: null
        }
    },
    async mounted() {
        // TODO mover isso para um utilitário
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.setorStore.carregarSetor(this.id)
        }
    }
}
</script>

<style scoped> .card-header {
     display: flex;
     justify-content: space-between;
     align-items: center;
 }

 .text {
     font-size: 14px;
 }

 .item {
     margin-bottom: 18px;
 }

 .box-card {
     width: 900px;
 }
</style>