<template>
    <el-form-item class="search">
        <el-form-item>
            <el-input type="text" name="pesquisa_serviço" v-model="servicoStore.pesquisa.descricao" placeholder="Serviço..."
                @keyup.enter="servicoStore.listar" style="width: 300px; padding: 0% 20px"/>
        </el-form-item>
        <div></div>
        <el-form-item>
            <el-select
            v-model="servicoStore.pesquisa.situacao" placeholder="Situação"
            @change="servicoStore.filtrarPorSituacao()"
            style="width: 240px">
                <el-option v-for="situacao in situacoes" :key="situacao.value" :label="situacao.label" :value="situacao.value"/>                
            </el-select>
        </el-form-item>
        <el-button @click="servicoStore.listar()">Pesquisar</el-button>
        <el-button class="btn" @click="servicoStore.limparPesquisa()">Limpar</el-button>
    </el-form-item>   
</template>

<script>
import { useServicoStore } from '@/store/ServicoStore'

export default {
    name: "ServicosBarraDePesquisa",
    data() {
        return {
            situacoes: [
                {
                    value: 'true',
                    label: 'Ativado'
                },
                {
                    value: 'false',
                    label: 'Desativado'
                }
            ]
        }
    },
    setup() {
        const servicoStore = useServicoStore()
        servicoStore.listar()
        return { servicoStore }
    }
}
</script>

<style scoped>
.search {
    display: flex;
    margin: auto;
}

.el-input {
    width: 100%;
    align-items: center;
    justify-content: space-between;
}

.btn {
    background-color: rgb(243, 243, 243);
    width: 95px;
}
</style>