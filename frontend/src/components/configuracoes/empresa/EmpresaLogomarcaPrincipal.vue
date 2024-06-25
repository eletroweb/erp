<template>
    <div class="imagem">
        <img :src="store.logomarca" alt="Empresa Logo" />
    </div>
</template>

<script>
import { ConfiguracaoEmpresaLogomarcaStore } from '@/store/configuracao/ConfiguracaoEmpresaLogomarcaStore'

export default {
    name: "EmpresaLogomarcaPrincipal",
    props: {
        displayEditButton: Boolean,
    },
    setup() {
        const store = ConfiguracaoEmpresaLogomarcaStore()
        store.carregarLogomarca()
        return { store }
    },
};
</script>

<style scoped>
.imagem {
    overflow: hidden;
    margin-top: 8px;
}
</style>