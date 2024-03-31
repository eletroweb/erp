<template>
  <el-tabs type="border-card">
    <el-tab-pane label="Projeto">
    <el-card class="box-card" shadow="never">
        <template #header>
            <div class="card-header">
                <span>
                    {{ this.id ? "Editar" : "Cadastrar" }}
                    Projeto</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200" v-if="id">
                    <p>Deseja confirma a exclusão do projeto
                        <el-tag type="danger">
                            {{ projetoStore.projeto.uuid }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="projetoStore.excluir(projetoStore.projeto.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

    <el-progress type="dashboard" :percentage="80" class="percentage">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progresso</span>
      </template>
    </el-progress>

    <el-progress type="dashboard" :percentage="0" class="percentage2">
      <template #default="{ percentage }">
        <span class="percentage-value">
            {{ projetoAtividadesStore.atividades.length }}
        </span>
        <span class="percentage-label">Atividades</span>
      </template>
    </el-progress>

    <br>
    <br>
        <el-form :model="projetoStore.projeto" label-width="120px">

            <el-form-item label="Cliente">
                <el-col :span="13">
                    <el-select v-model="projetoStore.projeto.cliente.uuid" 
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

            <el-form-item label="Responsável">
                <el-input v-model="projetoStore.projeto.responsavel" name="responsavel" id="responsavel"/>
            </el-form-item >

            <el-form-item label="Setor">
                <el-radio-group v-model="projetoStore.projeto.setor.uuid" class="ml-4" name="setor">
                    <div v-for="setor in this.setores" :key="setor.uuid" style="    margin-right: 20px;">
                        <el-radio ce :label="setor.uuid" size="large">
                            {{ setor.descricao }}
                        </el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="Orçamento">
                <el-input v-model="projetoStore.projeto.orcamento" placeholder="Orçamento">
                    <template #prepend>R$</template>
                </el-input>
            </el-form-item>

            
            <el-form-item label="Início">
                <el-col :span="5">
                    <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="projetoStore.projeto.data_inicio"
                        type="date" placeholder="Data Início" style="width: 100%" />
                </el-col>
                <el-col :span="2">
                    <span style=" margin-left: 18px;">
                        Fim
                    </span>
                </el-col>
                <el-col :span="5">
                    <el-date-picker :locale="ptBR" format="DD/MM/YYYY" v-model="projetoStore.projeto.data_fim" type="date"
                        placeholder="Data Fim" style="width: 100%" />
                </el-col>
            </el-form-item>

            <el-form-item label="Observação">
                <el-input v-model="projetoStore.projeto.observacao" type="textarea" name="observacao" id="observacao" />
            </el-form-item>

            <el-form-item label="Situação">
                <el-switch v-model="projetoStore.projeto.situacao" />
            </el-form-item>

            <el-form-item>

                <el-button :disabled="!projetoStore.btnSalvarValido" v-if="this.id == null" type="primary"
                    @click="projetoStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button v-else type="primary" @click="projetoStore.editar(projetoStore.projeto.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="projetoStore.cancelar()">Cancelar</el-button>
            </el-form-item>

        </el-form>
    </el-card>
    </el-tab-pane>


    <el-tab-pane label="Atividades">
        <ProjetoAtividadesListar/>
    </el-tab-pane>

  </el-tabs>

</template>

<script>
import { useProjetoStore } from '@/store/ProjetoStore'
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import { ClienteStore } from '../../store/ClienteStore'
import { SetorStore } from '../../store/SetorStore'
import ProjetoAtividadesListar from './projeto.atividades.listar.vue'

export default {
    components: {
        ProjetoAtividadesListar,
    },
    setup() {
        const projetoStore = useProjetoStore()
        const projetoAtividadesStore = ProjetoAtividadesStore()
        return { projetoStore, projetoAtividadesStore }
    },
    data() {
        return {
            confirmacaoVisivel: false,
            id: null,
            setores: [],
            clientes: [],
            setorSelecionado: null
        }
    },
    async mounted() {
        // TODO mover isso para um utilitário
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.id)) {
            this.id = this.$route.params.id
            this.projetoStore.carregarProjeto(this.id)
            this.projetoAtividadesStore.atividade.projeto = this.id
        }

        const setorStore = SetorStore()
        this.setores = await setorStore.listar();      
        
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
     position: relative;
 }

 .percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}

.percentage {
    position: absolute;
    left: 14%;
    top: 15px;
    background: #ffffff;
}

.percentage2 {
    position: absolute;
    left: 30%;
    top: 15px;
    background: #ffffff;
}
</style>