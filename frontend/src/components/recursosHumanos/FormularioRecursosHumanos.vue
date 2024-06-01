<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>
                    {{ this.id ? "Editar" : "Cadastrar" }}
                    Colaborador</span>
                <el-popover :visible="confirmacaoVisivel" placement="top" :width="200"
                    v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.COLABORADOR_EXCLUIR) && id">
                    <p>Deseja confirma a exclusão do colaborador
                        <el-tag type="danger">
                            {{ recursosHumanosStore.colaborador.nome }}
                        </el-tag>
                    </p>
                    <div style="text-align: right; margin: 0; display: flex;">
                        <el-button size="small" type="primary" plain
                            @click="confirmacaoVisivel = false">Cancelar</el-button>
                        <el-button size="small" type="danger"
                            @click="recursosHumanosStore.excluir(recursosHumanosStore.colaborador.uuid)">Confirmar</el-button>
                    </div>
                    <template #reference>
                        <el-button type="danger" @click="confirmacaoVisivel = true">Excluir</el-button>
                    </template>
                </el-popover>

            </div>
        </template>

        <el-form :model="recursosHumanosStore.colaborador" label-width="120px">

            <el-form-item label="Nome">
                <el-col :span="11">
                    <el-form-item label="">
                        <el-input v-model="recursosHumanosStore.colaborador.nome" name="nome" />
                    </el-form-item>
                </el-col>
                <el-col :span="13">
                    <el-form-item label="CPF">
                        <el-input v-model="recursosHumanosStore.colaborador.documento"
                            @blur="recursosHumanosStore.handleDocumento" name="documento" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="E-mail">
                <el-col :span="11">
                    <el-input v-model="recursosHumanosStore.colaborador.email" name="email"
                        @blur="recursosHumanosStore.validarEmail()" />
                </el-col>
                <el-col :span="13">
                    <el-form-item label="Telefone">
                        <el-input v-model="recursosHumanosStore.colaborador.telefone" name="telefone" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Cargo/Função">
                <el-col :span="11">
                    <el-select v-model="recursosHumanosStore.colaborador.cargo" placeholder="Selecione o cargo"
                        name="cargo">
                        <el-option v-for="cargo in recursosHumanosStore.cargos" :key="cargo.nome"
                            :label="cargo.nome" :value="cargo.nome" />
                    </el-select>
                    
                </el-col>
            </el-form-item>

            <el-form-item label="Salário">
                <el-col :span="11">
                    <el-input v-model="recursosHumanosStore.colaborador.salario" name="salario" />
                </el-col>
                <el-col :span="13">
                    <el-form-item label="Valor Hora">
                        <el-input v-model="recursosHumanosStore.colaborador.valor_hora" name="valorHora" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Observação">
                <el-col :span="24">
                    <el-form-item label="">
                        <el-input v-model="recursosHumanosStore.colaborador.observacao" name="observacao"
                            type="textarea" id="observação" />
                    </el-form-item>
                </el-col>
            </el-form-item>


            <el-form-item label="Situação">
                <el-switch v-model="recursosHumanosStore.colaborador.situacao" />
            </el-form-item>

            <el-form-item>
                <el-button :disabled="!recursosHumanosStore.btnSalvarValido"
                    v-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.COLABORADOR_CADASTRAR) && this.id == null"
                    type="primary" @click="recursosHumanosStore.cadastrar()">
                    Salvar
                </el-button>

                <el-button :disabled="!recursosHumanosStore.btnSalvarValido"
                    v-else-if="authorizationStore.hasAuthorizationOfThisAction(RolesEnum.COLABORADOR_EDITAR)"
                    type="primary" @click="recursosHumanosStore.editar(recursosHumanosStore.colaborador.uuid)">
                    Salvar alterações
                </el-button>

                <el-button class="btn" @click="recursosHumanosStore.cancelar()">Cancelar</el-button>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script>
import { RecursosHumanosStore } from '../../store/RecursosHumanosStore'
import { RolesEnum } from '@/enum/RolesEnum'
import { AuthorizationStore } from '@/store/AuthorizationStore'

export default {
    setup() {
        const recursosHumanosStore = RecursosHumanosStore()
        const authorizationStore = AuthorizationStore()
        return { recursosHumanosStore, authorizationStore, RolesEnum }
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
            this.recursosHumanosStore.carregarcolaborador(this.id)
        }

        await this.recursosHumanosStore.listarCargos()
    },
    methods: {
    },
    components: {
    }
}
</script>

<style scoped>
.card-header {
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
</style>@/enum/SystemEnum@/enum/RolesEnum