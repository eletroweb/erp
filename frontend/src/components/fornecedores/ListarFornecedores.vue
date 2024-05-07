<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Fornecedores</span> 
                <el-button 
                type="success" @click="fornecedorStore.novo()"
                v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.FORNECEDOR_CADASTRAR)">
                    Cadastrar
                </el-button>
            </div>
        </template>
        
        <el-table v-if="fornecedorStore.fornecedores.length > 0" :data="fornecedorStore.fornecedores" stripe style="width: 99%">
            <el-table-column prop="nome" label="Nome" width="400" />
            <el-table-column prop="telefone" label="Telefone" width="120" />
            <el-table-column prop="email" label="E-mail" width="250" />
            <el-table-column prop="situacao" label="Situação" width="100">
                <template #default="fornecedor">
                    <el-tag v-if="fornecedor.row.situacao" type="success">Ativado</el-tag>
                    <el-tag v-else type="info">Desativado</el-tag>
                </template>
            </el-table-column> 
            
            
            <el-table-column prop="acao" label="">
                <template #default="fornecedor">
                    <el-button 
                    type="primary" 
                    size="small"
                     @click="fornecedorStore.exibir(fornecedor.row.uuid)" 
                     plain
                     v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.CLIENTE_EDITAR)">
                     Editar
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-empty v-else description="Nenhum fornecedor cadastrado" />
    </el-card>

</template>

<script>
import { FornecedorStore } from '@/store/FornecedorStore'
import { AuthorizationStore } from '@/store/AuthorizationStore'
import { RolesEnum } from '@/enum/RolesEnum'

export default {
    setup() {
        const fornecedorStore = FornecedorStore()
        fornecedorStore.listar()

        const authorizationStore = AuthorizationStore()
        return { fornecedorStore, authorizationStore, RolesEnum }   
    },
    mounted(){},
    components: {},
    methods: {}    
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
    width: 99%;
}
</style>
