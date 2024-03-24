<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>
                    {{ this.id ? "Editar" : "Cadastrar" }}
                    Ordem de Serviço</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
                    <p>Deseja confirma a exclusão de ordem de serviço
                        <el-tag type="danger">
                            {{ ordemServicoStore.ordemServico.uuid }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="ordemServicoStore.excluir(ordemServicoStore.ordemServico.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

        <el-form :model="ordemServicoStore.ordemServico" label-width="120px">

            <el-form-item label="Cliente">
                <el-col :span="13">
                    <el-select v-model="ordemServicoStore.ordemServico.cliente.uuid" 
                    name="contrato"
                    placeholder="Selecionar o cliente..." style="width: 240px">
                        <el-option
                        v-for="item in clientes"
                        :key="item.uuid"
                        :label="item.nome"
                        :value="item.uuid"
                        />
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="Descrição">
                <el-input v-model="ordemServicoStore.ordemServico.descricao" name="descricao" id="descricao"/>
            </el-form-item >

            <el-form-item label="Setor">
                <el-radio-group v-model="ordemServicoStore.ordemServico.setor.uuid" class="ml-4" name="setor">
                    <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                        <el-radio ce :label="setor.uuid" size="large">
                            {{ setor.descricao }}
                        </el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Prazo">
                <el-col :span="5">
                    <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="ordemServicoStore.ordemServico.prazo"
                        type="date" placeholder="Data" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="Situação">
                <el-switch v-model="ordemServicoStore.ordemServico.situacao" />
            </el-form-item>

            <el-form-item>

                <el-button :disabled="ordemServicoStore.btnSalvarValido" v-if="this.id == null" type="primary"
                    @click="ordemServicoStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="ordemServicoStore.editar(ordemServicoStore.ordemServico.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="ordemServicoStore.cancelar()">Cancelar</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
import { useOrdemServicoStore } from '../../store/OrdemServicoStore'
import { SetorStore } from '../../store/SetorStore'
import { ClienteStore } from '@/store/ClienteStore'

export default {
    setup() {
        const ordemServicoStore = useOrdemServicoStore()
        return { ordemServicoStore }
    },
    data() {
        return {
            
            id: null,
            setores: [],
            setorSelecionado: null,
            clienteSelecionado: null,
            clientes: []
        }
    },
    async mounted() {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.ordemServicoStore.carregarOrdemServico(this.id)
        }

        // Carrega os setores
        const setorStore = SetorStore()
        this.setores = await setorStore.listar();

        // Carrega os Clientes
        const clienteStore = ClienteStore()
        this.clientes = await clienteStore.listar();
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