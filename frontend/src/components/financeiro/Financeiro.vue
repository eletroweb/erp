<template>
    <el-tabs type="border-card">

        <el-tab-pane label="Despesas">
            <DespesaListar />
        </el-tab-pane>

        <el-tab-pane label="Receitas">
            Receitas
        </el-tab-pane>

        <el-tab-pane label="Comparativo mensal">
            Comparativo mensal de Receita vs Despesa
            <apexchart width="100%" :type="grafico.tipo" :options="chartOptions" :series="series"></apexchart>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
import DespesaListar from "./despesas/DespesaListar.vue"

export default {
    components: {
        DespesaListar,
    },
    setup() {
    },
    methods: {
    },
    data: () => ({
        grafico: {
            tipo: 'bar'
        },
        series: [{
            name: 'Despesa',
            data: [44, 55, 57, 56]
        }, {
            name: 'Receita',
            data: [76, 85, 101, 98]
        }
        ],
        chartOptions: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: true,
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                //categories: ['Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
                //categories: ['Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro'],
                categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            },
            yaxis: {
                title: {
                    text: 'R$ (reais)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (valor) {
                        return `R$ ${valor}`
                    }
                }
            }
        },
    }),
}
</script>