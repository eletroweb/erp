<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Empresa">
            <ConfiguracaoEmpresa />
        </el-tab-pane>
        <el-tab-pane label="Usuários" v-if="usuarioLogadoStore.settings.has_company">
            <ListarUsuarios />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/Tag';
import Button from 'primevue/Button';
import ListarUsuarios from '@/components/usuarios/ListarUsuarios.vue';
import ConfiguracaoEmpresa from '@/components/configuracoes/ConfiguracaoEmpresa.vue';
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'

export default {
    components: {
        DataTable,
        Column,
        Tag,
        Button,
        ConfiguracaoEmpresa,
        ListarUsuarios
    },
    setup() {
        const usuarioLogadoStore = UsuarioLogadoStore()
        usuarioLogadoStore.getSettings()
        return { usuarioLogadoStore }
    },
    data() {
        return {
        };
    },
    mounted() {
    }
}
</script>
