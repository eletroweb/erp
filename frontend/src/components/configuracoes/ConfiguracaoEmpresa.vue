<template>
    <div class="container grid-container">
        <div>
            <EmpresaLogomarca displayEditButton="true" />
        </div>
        <div>
            <div class="linha coluna2">
                <div>
                    <div>
                        <label>Razão social </label>
                        <InputText type="text" v-model="configuracaoEmpresaStore.empresa.razaoSocial" class="input" />
                    </div>
                </div>

                <div>
                    <label>Nome fantasia </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.nomeFantasia" class="input" />
                </div>
            </div>
            <div class="linha coluna2">
                <div>
                    <label>CNPJ </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.cnpj" class="input" />
                </div>
                <div>
                    <label>E-mail </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.email" class="input" />
                </div>
            </div>
            <div class="linha coluna3">
                <div>
                    <label>CEP </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.cep" class="input" />
                </div>
                <div>
                    <label>Estado </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.estado" class="input" />
                </div>
                <div>
                    <label>Cidade </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.cidade" class="input" />
                </div>
            </div>

            <div class="linha endereco">
                <div>
                    <label>Endereço </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.endereco" class="input" />
                </div>
                <div>
                    <label>Número </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.numero" class="input" />
                </div>
            </div>

            <div class="linha col1">
                <div>
                    <label>Complemento </label>
                    <InputText type="text" v-model="configuracaoEmpresaStore.empresa.complemento" class="input" />
                </div>
            </div>
            <div class="linha">
                <div class="direita">
                    <Button label="Salvar" @click="configuracaoEmpresaStore.salvar()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ConfiguracaoEmpresaStore } from '@/store/configuracao/ConfiguracaoEmpresaStore'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import EmpresaLogomarca from '@/components/configuracoes/empresa/EmpresaLogomarca.vue'
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'

export default {
    name: "ConfiguracaoEmpresa",
    setup() {
        const configuracaoEmpresaStore = ConfiguracaoEmpresaStore();
        return { configuracaoEmpresaStore };
    },
    async mounted() {
        const usuarioLogadoStore = UsuarioLogadoStore();
        const settings = await usuarioLogadoStore.getSettings()
        if (settings.has_company)
            this.configuracaoEmpresaStore.exibir();

    },
    components: {
        Button,
        InputText,
        EmpresaLogomarca
    },
    methods: {
    },
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

.input {
    width: 100%;
}
</style>