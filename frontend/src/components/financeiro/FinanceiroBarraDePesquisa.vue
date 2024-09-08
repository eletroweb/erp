<template>
    <el-form-item  class="search">
      
        <el-form-item>
            <el-input 
            type="text" name="pesquisa_descricao"
            v-model="financeiroStore.pesquisa.descricao"
            placeholder="Descrição..."
            @keyup.enter="financeiroStore.listar"
            style="width: 205px; padding: 0% 4px " />
        </el-form-item>

        <el-form-item>
            <el-DatePicker 
            format="DD/MM/YYYY" value-format="YYYY/MM/DD" inputId="data_vencimento" v-model="financeiroStore.pesquisa.data_fim" type="date" placeholder="Data Início" showIcon iconDisplay="input" @keyup.enter="financeiroStore.listar"
            style="width: 125px; padding: 0% 4px" />
        </el-form-item>

        <el-form-item>
            <el-DatePicker 
            format="DD/MM/YYYY" value-format="YYYY/MM/DD" inputId="data_pagamento" v-model="financeiroStore.pesquisa.dataPagamentoInicio" type="date" placeholder="Data Fim" showIcon iconDisplay="input" @keyup.enter="financeiroStore.listar"
            style="width: 125px; padding: 0% 4px" />
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
            v-model="financeiroStore.pesquisa.situacao" :options="situacoes" placeholder="Situação"
            @keyup.enter="financeiroStore.listar">
                <el-option v-for="situacao in situacoes" :key="situacao.value" :label="situacao.label" :value="situacao.value"/> 
        </el-select>
        </el-form-item>
        <div class="button-group ">
            <Button class="btn-pesquisar" @click="financeiroStore.listar()" label="Pesquisar"/>
            <Button  class="btn-limpar" @click="financeiroStore.limparPesquisa()" severity="secondary"  label="Limpar"/>
            
        </div>
        
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
    flex-wrap: wrap; 
    justify-content: flex-end;
    margin-bottom: 25px;
    margin-top: 25px;
    max-width: 100%;
}

.el-input {
    width: 100%;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.el-select {
    width: 135px;
    padding: 0% 4px;
    margin-top: 8px;
    margin-bottom: 8px;
  
}
.button-group {
    display: flex;
    flex-direction: row-reverse;
    gap: 8px;
    
}
.btn-limpar {
    color: #8f9091 ;
    border:1px solid #f8fafc;
    background-color: #eef6f9;
    font-size: 14px;;
    width: 100px;
    
}
 
.btn-pesquisar {
    color: #ffffff;
    background: #10b981;
    border: 1px solid #10b981;
    font-size: 14px;
    width: 100px;
} 


</style>