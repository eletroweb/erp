<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Empresa">
            <ConfiguracaoEmpresa />
        </el-tab-pane>
        <el-tab-pane label="Usuários">
            <ListarUsuarios />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { UsuarioStore } from '@/store/UsuarioStore.ts'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/Tag';
import Button from 'primevue/Button';
import ListarUsuarios from '@/components/usuarios/ListarUsuarios.vue';
import ConfiguracaoEmpresa from '@/components/configuracoes/ConfiguracaoEmpresa.vue';

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
        const usuarioStore = UsuarioStore()
        // carregar cleintes
        usuarioStore.listar()
        return { usuarioStore }
    },
    data() {
        return {
        };
    },
    mounted() {
    }
}
</script>
