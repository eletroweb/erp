<template>    
    <el-card class="box-card">
       <template #header>
            <div class="card-header">
                <span>
                    {{ this.id ? "Editar" : "Cadastrar" }}
                    Fornecedor</span>
                <el-popover 
                :visible="confirmacaoVisivel" placement="top" :width="200" 
                v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.FORNECEDOR_EXCLUIR) && id">
                    <p>Deseja confirma a exclusão do Fornecedor
                        <el-tag type="danger">
                            {{ fornecedorStore.fornecedor.nome }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="fornecedorStore.excluir(fornecedorStore.fornecedor.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

        <el-form :model="fornecedorStore.fornecedor" label-widht="120px">
            <el-form-item label="Nome">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="fornecedorStore.fornecedor.nome" name="nome" />
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label=" CPF ou CNPJ">
                        <el-input v-model="fornecedorStore.fornecedor.documento" @blur="fornecedorStore.handleDocumento" name="documento" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="Estado">
                <el-col :span="6">
                    <el-select v-model="fornecedorStore.fornecedor.estado" placeholder="Selecione o Estado" name="uf">
                        <el-option label="PB" value="PB" />
                    </el-select>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="Cidade">
                        <el-input v-model="fornecedorStore.fornecedor.cidade" name="cidade"/>
                    </el-form-item>
                </el-col>
            </el-form-item>            
           
            <el-form-item label="E-mail">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="fornecedorStore.fornecedor.email" name="email" @blur="fornecedorStore.validarEmail()"/>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="Telefone">
                        <el-input v-model="fornecedorStore.fornecedor.telefone" name="telefone" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            
            <el-form-item label="Endereço">
                <el-input v-model="fornecedorStore.fornecedor.endereco" name="endereco" id="endereco" />
            </el-form-item>

            <el-form-item label="Complemento">
                <el-input v-model="fornecedorStore.fornecedor.complemento" type="textarea" name="complemento" id="complemento" />
            </el-form-item>
            
            <el-form-item label="Situação">
                <el-switch v-model="fornecedorStore.fornecedor.situacao" />
            </el-form-item>

            <el-form-item>
                <el-button :disabled="!fornecedorStore.btnSalvarValido" v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.FORNECEDOR_CADASTRAR) && this.id == null" type="primary"
                    @click="fornecedorStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.FORNECEDOR_EDITAR)" type="primary" @click="fornecedorStore.editar(fornecedorStore.fornecedor.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="fornecedorStore.cancelar()">Cancelar</el-button>
            </el-form-item>


            
        </el-form>
    </el-card>
</template>

<script>
import { FornecedorStore } from '../../store/FornecedorStore'
import { RolesEnum } from '@/enum/RolesEnum'
import { AuthorizationStore } from '@/store/AuthorizationStore'

export default {
    setup() {
        const fornecedorStore = FornecedorStore()
        const authorizationStore = AuthorizationStore()
        return { fornecedorStore, authorizationStore, RolesEnum }
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
            this.fornecedorStore.carregarFornecedor(this.id)
        }        
    },
    methods: {
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
