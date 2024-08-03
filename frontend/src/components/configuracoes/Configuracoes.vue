<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Empresa">
            <ConfiguracaoEmpresa />
        </el-tab-pane>
        <el-tab-pane label="Usuários" v-if="usuarioLogadoStore.settings.has_company">
            <ListarUsuarios />
        </el-tab-pane>
        <el-tab-pane label="Notificações">
            <div class="notifications-tab">
                <ToggleSwitch v-model="notificacoesDespesas" />
                <label for="notificacoesDespesas">Notificações de despesas com vencimento</label>
                <InputNumber v-if="notificacoesDespesas"v-model="notificacaoDias" :min="1" :max="30" />
                <span v-if="notificacoesDespesas">dias</span>
            </div>
            <Button @click="salvarConfiguracoes" label="Salvar" />
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import DataTable from 'primevue/datatable';
import ToggleSwitch from 'primevue/toggleswitch';
import InputNumber from 'primevue/inputnumber';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import ListarUsuarios from '@/components/usuarios/ListarUsuarios.vue';
import ConfiguracaoEmpresa from '@/components/configuracoes/ConfiguracaoEmpresa.vue';
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'
import { errorMessages } from 'vue/compiler-sfc';

export default {
    components: {
        DataTable,
        Column,
        Tag,
        Button,
        ConfiguracaoEmpresa,
        ListarUsuarios,
        ToggleSwitch,
        InputNumber
    },
    setup() {
        const usuarioLogadoStore = UsuarioLogadoStore()
        usuarioLogadoStore.getSettings()
        return { usuarioLogadoStore }
    },
    data() {
        return {
            notificacoesDespesas: false,
            notificacaoDias: 5,
            errorMessage: '',
            successMessage: ''
        };
    },
    mounted() {
    },
    methods: {
        salvarConfiguracoes() {
            this.errorMessage = '';
            this.successMessage = '';

            if(this.notificacoesDespesas) {
                if(!this.notificacaoDias || this.notificacaoDias <= 0) {
                    this.errorMessage = 'Preencha o campo dias';
                    console.log("Erro: Preencha o campo dias");
                    return;
                }

                this.successMessage = "Configurações salvas com sucesso."

                console.log("Configurações salvas com sucesso")
            } else {
                console.log("Notificações desabilitadas");
            }

            
        }
    }
}
</script>

<style scoped>
.notifications-tab {
  display: flex;
  align-items: center; 
  gap: 10px; 
  padding: 40px;
  height: 200px;
}

.error-message {
  color: red;
}
</style>