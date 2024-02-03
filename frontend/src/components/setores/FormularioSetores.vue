<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Cadastrar Setor</span>
                <el-button type="success">Cadastrar</el-button>
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
                <el-button type="primary" @click="setorStore.cadastrar()">Salvar</el-button>
                <el-button>Cancelar</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import {useSetorStore } from '../../store/SetorStore'

export default {
    setup() {
        const setorStore = useSetorStore()
        return {setorStore}
    },
    async mounted() {
    },
    data: () => {
        return {
            setor: {
                descricao: '',
                situacao: true,
            }
        }
    },
    components: {
    },
    methods: {
        OnSubmit() {
            cadastrarSetor(this.setor)
            listarSetores();
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