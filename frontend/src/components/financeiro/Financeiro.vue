<template>

    <el-tabs tab-position="top" style="height: 810px" type="border-card">
        <el-tab-pane label="">

            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <money />
                    </el-icon>
                    <span> Receita e Despesa</span>
                </span>
            </template>

            <FinanceiroListar />
        </el-tab-pane>
        <!-- el-tab-pane label="">
            <template #label>
                <span class="custom-tabs-label">
                    <el-icon>
                        <PieChart />
                    </el-icon>
                    <span> Relatório</span>
                </span>
            </template>
            Comparativo mensal de Receita vs Financeiro
            <apexchart width="100%" :type="grafico.tipo" :options="chartOptions" :series="series"></apexchart>
        </el-tab-pane -->
    </el-tabs>

</template>

<script>

import FinanceiroListar from "@/components/financeiro/FinanceiroListar.vue"

export default {
    components: {
        FinanceiroListar
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
            name: 'Financeiro',
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