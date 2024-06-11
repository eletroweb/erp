<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Empresa">...</el-tab-pane>
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

export default {
    components: {
        DataTable,
        Column,
        Tag,
        Button,
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
