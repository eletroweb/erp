<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Cadastrar Cliente</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
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
                <el-input v-model="clienteStore.cliente.nome" />
            </el-form-item>
            <el-form-item label="Estado">
                <el-select v-model="clienteStore.cliente.estado" placeholder="Selecione o Estado">
                    <el-option label="PB" value="PB" />
                </el-select>
            </el-form-item>
            <el-form-item label="E-mail">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="clienteStore.cliente.email" />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="Telefone">
                        <el-input v-model="clienteStore.cliente.telefone" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <!-- TODO CARREGAR OS SETORES DINAMICAMENTE -->
            <el-form-item label="Área">
                <el-checkbox-group v-model="clienteStore.cliente.setor">
                    <el-checkbox label="Engneharia Civil" name="type" />
                    <el-checkbox label="Segurança do Trabalho" name="type" />
                    <el-checkbox label="Meio Ambiente" name="type" />
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="Endereço">
                <el-input v-model="clienteStore.cliente.endereco" type="textarea" />
            </el-form-item>

            <el-form-item label="Situação">
                <el-switch v-model="clienteStore.cliente.situacao" />
            </el-form-item>

            <el-form-item>

                <el-button v-if="this.id == null" type="primary" @click="clienteStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="clienteStore.editar(clienteStore.cliente.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="clienteStore.cancelar()">Cancelar</el-button>
            </el-form-item>
            
        </el-form>
    </el-card>
</template>

<script>
import { useClienteStore } from '../../store/ClienteStore'

export default {
    setup() {
        const clienteStore = useClienteStore()
        return { clienteStore }
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

        console.log(this.$route.params.id);
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.clienteStore.carregarCliente(this.id)
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