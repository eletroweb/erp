<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>
                    {{ this.id ? "Editar" : "Cadastrar" }}
                    Cliente</span>
                <el-popover 
                :visible="confirmacaoVisivel" placement="top" :width="200" 
                v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.CLIENTE_EXCLUIR) && id">
                    <p>Deseja confirma a exclusão do cliente
                        <el-tag type="danger">
                            {{ clienteStore.cliente.nome }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="clienteStore.excluir(clienteStore.cliente.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

        <el-form :model="clienteStore.cliente" label-width="120px">

            <el-form-item label="Nome">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="clienteStore.cliente.nome" name="nome" />
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="CPF ou CNPJ">
                        <el-input v-model="clienteStore.cliente.documento" @blur="clienteStore.handleDocumento" name="documento" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Estado">
                <el-col :span="6">
                    <el-select v-model="clienteStore.cliente.estado" placeholder="Selecione o Estado" name="uf">
                        <el-option label="PB" value="PB" />
                    </el-select>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="Cidade">
                        <el-input v-model="clienteStore.cliente.cidade" name="cidade"/>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="E-mail">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="clienteStore.cliente.email" name="email" @blur="clienteStore.validarEmail()"/>
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="Telefone">
                        <el-input v-model="clienteStore.cliente.telefone" name="telefone"/>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Setor">
                <el-radio-group v-model="clienteStore.cliente.setor.uuid" class="ml-4" name="setor">
                    <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                        <el-radio ce :label="setor.uuid" size="large">
                            {{ setor.descricao }}
                        </el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Endereço">
                <el-input v-model="clienteStore.cliente.endereco" name="endereco" id="endereco"/>
            </el-form-item>

            <el-form-item label="Complemento">
                <el-input v-model="clienteStore.cliente.complemento" type="textarea" name="complemento" id="complemento" />
            </el-form-item>

            <el-form-item label="Situação">
                <el-switch v-model="clienteStore.cliente.situacao" />
            </el-form-item>

            <el-form-item>
                <el-button :disabled="!clienteStore.btnSalvarValido" v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.CLIENTE_CADASTRAR) && this.id == null" type="primary"
                    @click="clienteStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.CLIENTE_EDITAR)" type="primary" @click="clienteStore.editar(clienteStore.cliente.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="clienteStore.cancelar()">Cancelar</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
import { ClienteStore } from '../../store/ClienteStore'
import { SetorStore } from '../../store/SetorStore'
import { RolesEnum } from '@/enum/RolesEnum'
import { AuthorizationStore } from '@/store/AuthorizationStore'

export default {
    setup() {
        const clienteStore = ClienteStore()
        const authorizationStore = AuthorizationStore()
        return { clienteStore, authorizationStore, RolesEnum }
    },
    data() {
        return {
            confirmacaoVisivel: false,
            id: null,
            setores: null,
            setorSelecionado: null
        }
    },
    async mounted() {
        // TODO mover isso para um utilitário
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.clienteStore.carregarCliente(this.id)
        }

        const setorStore = SetorStore()
        const setores = await setorStore.listar()
        this.setores = setores;
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