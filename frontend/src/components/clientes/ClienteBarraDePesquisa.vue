<template>
    <el-form-item class="search">
        <el-form-item>
            <el-input type="text" v-model="clienteStore.pesquisa.nome" placeholder="Nome..."
                @keyup.enter="clienteStore.listar" />
        </el-form-item>
        <el-form-item>
            <el-input v-model="clienteStore.pesquisa.documento" placeholder="CPF/CNPJ..."
                @keyup.enter="clienteStore.listar" name="documento" />
        </el-form-item>
        <el-form-item>
            <el-select 
            v-model="clienteStore.pesquisa.situacao" 
            placeholder="Situação"
            @change="clienteStore.filtrarPorSituacao()" 
            style="width: 240px">
                <el-option v-for="situacao in situacoes" :key="situacao.value" :label="situacao.label" :value="situacao.value" />
            </el-select>
        </el-form-item>
        <el-button @click="clienteStore.listar()">Pesquisar</el-button>
        <el-button class="btn" @click="clienteStore.limparPesquisa()">Limpar</el-button>
    </el-form-item>
</template>

<script>
import { ClienteStore } from '@/store/ClienteStore'

export default {
    name: "ClienteBarraDePesquisa",
    data() {
        return {
            situacoes: [
                {
                    value: 'true',
                    label: 'Habilitado',
                },
                {
                    value: 'false',
                    label: 'Desabilitado',
                },
            ]
        }
    },
    setup() {
        const clienteStore = ClienteStore()
        clienteStore.listar()
        return { clienteStore }
    },
}
</script>

<style scoped>
.search {
    display: flex;
    margin: auto;
}

.el-input {
    width: 93%;
}

.btn {
    background-color: rgb(243, 243, 243);
    width: 95px;
}
</style>