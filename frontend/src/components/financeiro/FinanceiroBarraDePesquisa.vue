<template>
    <el-form-item class="search">
        <div>
            <h4>Buscar</h4>
        </div>
        <el-form-item>
            <el-input 
            type="text" name="pesquisa_descricao"
            v-model="financeiroStore.pesquisa.descricao"
            placeholder="Descrição..."
            @keyup.enter="financeiroStore.listar"
            style="width: 335px; padding: 0% 10px" />
        </el-form-item>

        <el-form-item>
            <el-DatePicker 
            format="DD/MM/YYYY" value-format="YYYY/MM/DD" inputId="data_vencimento" v-model="financeiroStore.pesquisa.data_fim" type="date" placeholder="Data vencimento" showIcon iconDisplay="input" @keyup.enter="financeiroStore.listar"
            style="width: 335px; padding: 0% 10px" />
        </el-form-item>

        <el-form-item>
            <el-DatePicker 
            format="DD/MM/YYYY" value-format="YYYY/MM/DD" inputId="data_pagamento" v-model="financeiroStore.pesquisa.dataPagamentoInicio" type="date" placeholder="Data Pagamento" showIcon iconDisplay="input" @keyup.enter="financeiroStore.listar"
            style="width: 335px; padding: 0% 10px" />
        </el-form-item>

        <el-form-item>
            <el-select
            v-model="financeiroStore.pesquisa.categoria" placeholder="Categoria"
            :options="financeiroCategoria"
            @keyup.enter="financeiroStore.listar" >
                <el-option v-for="categoria in categorias" :key="categoria.value" :label="categoria.label" :value="categoria.value"/> 
        </el-select>
        </el-form-item>

        <el-form-item>
            <el-select 
            v-model="financeiroStore.pesquisa.parcelada" :options="parcelas" placeholder="Parcelas"
            @keyup.enter="financeiroStore.listar">
                <el-option v-for="parcela in parcelas" :key="parcela.value" :label="parcela.label" :value="parcela.value"/> 
        </el-select>
        </el-form-item>

        <el-form-item>
            <el-select 
            v-model="financeiroStore.pesquisa.situacao" :options="situacoes" placeholder="Situação"
            @keyup.enter="financeiroStore.listar">
                <el-option v-for="situacao in situacoes" :key="situacao.value" :label="situacao.label" :value="situacao.value"/> 
        </el-select>
        </el-form-item>

        <el-button @click="financeiroStore.listar()">Pesquisar</el-button>
        <el-button class="btn" @click="financeiroStore.limparPesquisa()">Limpar</el-button>
    </el-form-item>
</template>

<script>
import { FinanceiroStore } from "@/store/financeiro/FinanceiroStore";

export default {
    name: "FinanceiroBarraDePesquisa",
    setup() {
        const financeiroStore = FinanceiroStore()
        financeiroStore.listar()
        return { financeiroStore }
    },
    data() {
        return {
            categorias: [
                { 
                    value: 'RECEITA',
                    label: 'Receita'
                },
                {
                    value: 'DESPESA',
                    label: 'Despesa'
                }
            ],
            parcelas: [
                { value: '1x', label: '1x' },
                { value: '2x', label: '2x' },
                { value: '3x', label: '3x' },
                { value: '4x', label: '4x' },
                { value: '5x', label: '5x' },
                { value: 'SIM', label: '6x' },
                { value: 'SIM', label: '7x' },
                { value: 'SIM', label: '8x' },
                { value: 'SIM', label: '9x' },
                { value: 'SIM', label: '10x' },
                { value: 'SIM', label: '11x' },
                { value: 'SIM', label: '12x' }
            ],
            situacoes: [
                { value: 'PAGA', label: 'PAGA' },
                { value: 'PENDENTE', label: 'PENDENTE' },
                { value: 'VENCIDA', label: 'VENCIDA' },
                { value: 'ARQUIVADO', label: 'ARQUIVADO' }
            ]
        }
    },  
}

</script>

<style scoped>
.search {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 25px;
}

.el-input {
    width: 100%;
    align-items: center;
}

.el-select {
    width: 335px;
    padding: 0% 10px
}

.btn {
    color: rgb(0, 151, 25);
    border-color: rgb(21, 168, 45);
    background-color: rgb(243, 243, 243);
    width: 100px;
}
</style>