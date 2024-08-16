<template>
    <div class="despesa-receita">
        <h4>RESUMO</h4>
        <span class="receita">Receita: <span class="valor" style="color:#1f9e11">{{
            this.formatarReal(financeiroStore.resumo.total_receita) }}</span></span>
        <span class="despesa">Despesas: <span class="valor" style="color:coral">{{
            this.formatarReal(financeiroStore.resumo.total_despesa) }}</span></span>
    </div>
</template>

<script>
import { FinanceiroStore } from '@/store/financeiro/FinanceiroStore.ts'
import { formatarReal } from '@/common/util.ts';

export default {
    name: 'FinanceiroResumo',
    setup() {
        const financeiroStore = FinanceiroStore()
        financeiroStore.carregarResumoTotal

        return { financeiroStore, formatarReal }
    },
    async mounted() {

    },
    components: {
    },
}


</script>
<style>
.despesa-receita {
    width: 250px;
}

.despesa-receita span {
    display: block;
    margin-bottom: 2px;
}

.despesa-receita h4 {
    margin-bottom: 5px;
    border-bottom: 2px solid #857f7f;
    padding-bottom: 5px;
}

.despesa-receita .receita,
.despesa-receita .despesa {
    display: flex;
    justify-content: space-between;
}

.valor {
    font-weight: bold;
}
</style>