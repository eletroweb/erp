<template>
    <div>
        <div class="imagem">
            <img :src="store.logomarca" alt="Empresa Logo" />
        </div>
        <label v-if="displayEditButton" class="picture" tabIndex="0">
            <div class="selecionar-arquivo">
                <input type="file" name="logomarca" @change="store.selecionarImagem($event.target.files);">
                <p>
                    Editar logomarca
                </p>
            </div>
        </label>
    </div>

</template>

<script>
import { ConfiguracaoEmpresaLogomarcaStore } from '@/store/configuracao/ConfiguracaoEmpresaLogomarcaStore'

export default {
    name: "ConfiguracaoEmpresaLogomarca",
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
.selecionar-arquivo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 225px;
    height: 33px;
    background-color: #ECF5FF;
    font-weight: normal;
    border-radius: 7px;
    border: 1px solid #409EFF;
    color: #409EFF;
    overflow: hidden;
    cursor: pointer;
}

.selecionar-arquivo input[type="file"] {
    position: absolute;
    top: -100px;
}

.imagem {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 225px;
}

.imagem img {
    width: 100%
}
</style>