<template>
    <div class="container grid-container">
        <div>
            <div class="imagem"></div>
            <label class="picture" tabIndex="0">
                <div class="selecionar-arquivo">
                    <input type="file" name="logomarca" @change="filesChange($event.target.files);">
                    <p>
                        Editar logomarca
                    </p>
                </div>
            </label>
        </div>
        <div>
            <div class="linha coluna2">
                <div>
                    <label>Razão social </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.razaoSocial"
                        placeholder="Informe a razão social..." clearable />
                </div>

                <div>
                    <label>Nome fantasia </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.nomeFantasia"
                        placeholder="Informe o nome fantasia..." clearable />
                </div>
            </div>
            <div class="linha coluna2">
                <div> <label>CNPJ </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.cnpj" placeholder="Informe o CNPJ" clearable />
                </div>
                <div>
                    <label>E-mail </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.email" placeholder="" clearable />

                </div>
            </div>
            <div class="linha coluna3">
                <div>
                    <label>CEP </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.cep" placeholder="" clearable />

                </div>
                <div>
                    <label>Estado </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.estado" placeholder="" clearable />
                </div>
                <div>
                    <label>Cidade </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.cidade" placeholder="" clearable />
                </div>
            </div>

            <div class="linha endereco">
                <div>
                    <label>Endereço </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.endereco" placeholder="" clearable />
                </div>
                <div>
                    <label>Número </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.numero" placeholder="" clearable />
                </div>
            </div>

            <div class="linha col1">
                <div>
                    <label>Complemento </label>
                    <el-input v-model="configuracaoEmpresaStore.empresa.complemento" placeholder="" clearable />
                </div>
            </div>
            <div class="linha">
                <div class="direita">
                    <Button label="Salvar" @click="configuracaoEmpresaStore.salvarFornulario()" />
                    <Button label="Cancelar" @click="configuracaoEmpresaStore.cancelar()" severity="secondary" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ConfiguracaoEmpresaStore } from '@/store/configuracao/ConfiguracaoEmpresaStore'

import Button from 'primevue/button';


export default {
    name: "ConfiguracaoEmpresa",
    setup() {
        const configuracaoEmpresaStore = ConfiguracaoEmpresaStore()
        return { configuracaoEmpresaStore }
    },
    components: {
        Button
    },
    methods: {
    }
}
</script>

<style scoped>
div {
    gap: 5px
}

.container {
    display: grid;
    gap: 10px;
    padding: 5px;
}

.grid-container {
    grid-template-columns: 25% 75%;
}

.linha {
    display: grid;
    margin-bottom: 5px
}

.coluna2 {
    grid-template-columns: 50% 50%;
}

.coluna3 {
    grid-template-columns: 33.33% 33.33% 33.33%;
}

.endereco {
    grid-template-columns: 75% 25%;
}

.imagem {
    width: 225px;
    height: 225px;
    background-color: #f0f0f0;
}

.direita {
    display: flex;
    justify-content: flex-end;
}

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
</style>