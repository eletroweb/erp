<template>
    <div class="button-container">
        <Button label="Cadastrar Usuário" @click="usuarioStore.novo()" />
    </div>

    <DataTable :value="usuarioStore.usuarios" stripedRows tableStyle="min-width: 50rem">
        <Column field="nome" header="Nome"></Column>
        <Column header="situacao">
            <template #body="slotProps">
                <Tag v-if="slotProps.data.situacao == 'ATIVO'" severity="success" :value="slotProps.data.situacao">
                </Tag>
                <Tag v-else severity="Secondary" :value="slotProps.data.situacao"></Tag>
            </template>
        </Column>

        <Column header="">
            <template #body="slotProps">
                <Button label="Editar" @click="usuarioStore.exibir(slotProps.data.uuid)" severity="info" size="small" />
            </template>
        </Column>
    </DataTable>
</template>

<script>
import { UsuarioStore } from '@/store/UsuarioStore.ts'

export default {
    components: {
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

<style scoped>
.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
    gap: 10px;
}
</style>
