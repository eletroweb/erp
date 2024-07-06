<template>
    <div class="imagem">
        <img v-if="store.logomarca" :src="store.logomarca" alt="Empresa Logo" />
        <img v-else src="/images/logo-lab.png" alt="Example Image">
    </div>
</template>

<script>
import { ConfiguracaoEmpresaLogomarcaStore } from '@/store/configuracao/ConfiguracaoEmpresaLogomarcaStore'
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'

export default {
    name: "EmpresaLogomarcaPrincipal",
    props: {
        displayEditButton: Boolean,
    },
    setup() {
        const store = ConfiguracaoEmpresaLogomarcaStore()
        const usuarioLogadoStore = UsuarioLogadoStore()
        if (usuarioLogadoStore.settings.has_company)
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