
<template>
    <Fieldset legend="Gantt">
        <div class="gantt">
            <div class="coluna1">
                <div class="titulo">Atividades</div>
                <div class="etapas">
                    <div class="etapa" v-for="etapa in etapas" :key="etapa.index">
                        {{ etapa.nome_etapa }}
                    </div>
                </div>
            </div>
            <div class="coluna2">
                <ScrollPanel orientation="horizontal" style="width: 100%; height: 250px">
                <div class="meses">
                    <div v-for="(mes, index) in meses" :key="index" class="mes" :style="mes.style">
                        {{ mes.nome }}
                    </div>
                </div>
                    <div class="barras" v-for="etapa in etapas" :key="etapa.index">
                        <div v-for="atividade in etapa.atividades" :key="atividade.index">
                            <!-- div class="barra" :style="carregarEstiloBarra(atividade.data_inicio_atividade)" -->
                            <div class="barra">
                                <!-- {{ somaDuracaoDias(atividade) }} {{ atividade.duracao_dias }}
                                {{ carregarEstiloBarra(atividade.data_inicio_atividade) }}-->
                                {{ atividade.nome_atividade }}
                            </div>
                        </div>
                    </div>
                </ScrollPanel>

            </div>
        </div>
    </Fieldset>
</template>

<style scoped>
@import './projeto.atividades.gantt.css';
</style>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import Fieldset from 'primevue/fieldset';
import dayjs from 'dayjs'
import ScrollPanel from 'primevue/scrollpanel';

const meses = []

export default {
    name: "ProjetoAtividadesGantt",
    data() {
        return {
            meses: [],
            etapas: [
                {
                    nome_etapa: "Planejamento",
                    data_inicio_etapa: "2024-01-01",
                    data_fim_etapa: "2024-02-15",
                    atividades: [
                        {
                            nome_atividade: "Análise de Requisitos",
                            data_inicio_atividade: "2024-01-01",
                            data_fim_atividade: "2024-01-10",
                            duracao_dias: 30
                        },
                        {
                            nome_atividade: "Aprovação de Projeto",
                            data_inicio_atividade: "2024-01-11",
                            data_fim_atividade: "2024-01-21",
                            duracao_dias: 14
                        },
                    ]
                },
                {
                    nome_etapa: "Fundação",
                    data_inicio_etapa: "2024-02-01",
                    data_fim_etapa: "2024-02-28",
                    atividades: [
                        {
                            nome_atividade: "Escavação",
                            data_inicio_atividade: "2024-01-01",
                            data_fim_atividade: "2024-01-15",
                            duracao_dias: 15
                        },
                        {
                            nome_atividade: "Lançamento de Concreto",
                            data_inicio_atividade: "2024-02-16",
                            data_fim_atividade: "2024-02-28",
                            duracao_dias: 12
                        }
                    ]
                },
            ]
        }
    },
    setup() {
        const atividadesStore = ProjetoAtividadesStore()
        return { atividadesStore }
    },
    components: {
        Fieldset,
        ScrollPanel
    },
    mounted() {
        // Carregar todas as datas
        const datas = []
        this.etapas.forEach(etapa => {
            etapa.atividades.forEach(atividade => {
                datas.push(atividade.data_inicio_atividade)
            })
        })

        // Carregar meses
        const uniqueMonths = [...new Set(datas.map(data => dayjs(data).format('M')))];
        console.log(uniqueMonths);

        this.meses = uniqueMonths.map(data => {
            const monthNumber = dayjs(data).month() + 1
            return {
                id: monthNumber,
                nome: dayjs().month(monthNumber - 1).format('MMMM'),
                style: this.carregarEstiloMes(data)
            }
        })

        const atividadesJaneiro = this.obterAtividadesPorMes(1);
        console.log(atividadesJaneiro);
    },
    methods: {
        carregarEstiloMes(data) {
            const mes = parseInt(dayjs(data).format('M'))
            const atividadesFiltradas = this.etapas.flatMap(etapa =>
                etapa.atividades.filter(atividade => {
                    const dataInicio = dayjs(atividade.data_inicio_atividade);
                    const dataFim = dayjs(atividade.data_fim_atividade);
                    return dataInicio.month() + 1 === mes || dataFim.month() + 1 === mes;
                })
            );

            const somaDuracao = atividadesFiltradas.reduce((total, atividade) => {
                return total + atividade.duracao_dias;
            }, 0);

            if (somaDuracao === 0) {
                return {
                    width: 'auto',
                };
            }

            return {
                width: `${somaDuracao *10}px`,
            };
        },
        carregarEstiloBarra(data) {
            const mes = parseInt(dayjs(data).format('M'))
            const atividadesFiltradas = this.etapas.flatMap(etapa =>
                etapa.atividades.filter(atividade => {
                    const dataInicio = dayjs(atividade.data_inicio_atividade);
                    const dataFim = dayjs(atividade.data_fim_atividade);
                    return dataInicio.month() + 1 === mes || dataFim.month() + 1 === mes;
                })
            );

            const somaDuracao = atividadesFiltradas.reduce((total, atividade) => {
                return total + atividade.duracao_dias;
            }, 0);

            //const marginLeft = 

            if (somaDuracao === 0) {
                return {
                    width: 'auto',
                };
            }

            return {
                width: `${somaDuracao * 3}px`,
            };
        },
        somaDuracaoDias(atividade) {
            const dataInicioAtividade = dayjs(atividade.data_inicio_atividade);
            let ultimaDataFimAnterior = null;

            this.etapas.forEach(etapa => {
                etapa.atividades.forEach(ativ => {
                    const dataFimAtividade = dayjs(ativ.data_fim_atividade);

                    if (dataFimAtividade.isBefore(dataInicioAtividade)) {
                        if (!ultimaDataFimAnterior || dataFimAtividade.isAfter(ultimaDataFimAnterior)) {
                            ultimaDataFimAnterior = dataFimAtividade;
                        }
                    }
                });
            });

            if (ultimaDataFimAnterior)
                return dataInicioAtividade.diff(ultimaDataFimAnterior, 'day');

            return 0;
        },
        obterAtividadesPorMes(mesId) {
            const atividadesNoMes = [];

            this.etapas.forEach(etapa => {
                etapa.atividades.forEach(atividade => {
                const dataInicio = new Date(atividade.data_inicio_atividade);
                if (dataInicio.getMonth() + 1 === mesId) {
                    atividadesNoMes.push(atividade.nome_atividade);
                }
                });
            });

            return atividadesNoMes;
        },
        getMonthStyle(mes) {
            const atividadesFiltradas = this.etapas.flatMap(etapa =>
                etapa.atividades.filter(atividade => {
                    const dataInicio = dayjs(atividade.data_inicio_atividade);
                    const dataFim = dayjs(atividade.data_fim_atividade);
                    return dataInicio.month() + 1 === mes || dataFim.month() + 1 === mes;
                })
            );

            const somaDuracao = atividadesFiltradas.reduce((total, atividade) => {
                return total + atividade.duracao_dias;
            }, 0);

            if (somaDuracao === 0) {
                return {
                    width: 'auto'
                };
            }

            return {
                width: `${somaDuracao * 5}px`,
            };
        },
        getMonthNames() {
            const etapas = this.etapas
            if (etapas.length === 0) return [];

            let dataInicio = dayjs(etapas[0].atividades[0].data_inicio_atividade);
            let dataFim = dayjs(etapas[0].atividades[0].data_fim_atividade);

            etapas.forEach(etapa => {
                etapa.atividades.forEach(atividade => {
                    const inicioAtividade = dayjs(atividade.data_inicio_atividade);
                    const fimAtividade = dayjs(atividade.data_fim_atividade);

                    if (inicioAtividade.isBefore(dataInicio)) {
                        dataInicio = inicioAtividade;
                    }
                    if (fimAtividade.isAfter(dataFim)) {
                        dataFim = fimAtividade;
                    }
                });
            });

            const monthNames = [];
            let currentDate = dataInicio.startOf('month');

            while (currentDate.isBefore(dataFim) || currentDate.isSame(dataFim, 'month')) {
                const nome = currentDate.format('MMMM');
                monthNames.push({ nome });
                currentDate = currentDate.add(1, 'month');
            }

            return monthNames;
        },

        somaDuracaoDiasPorMes(mes) {
            const atividadesFiltradas = this.etapas.flatMap(etapa =>
                etapa.atividades.filter(atividade => {
                    const dataInicio = dayjs(atividade.data_inicio_atividade);
                    const dataFim = dayjs(atividade.data_fim_atividade);
                    return dataInicio.month() + 1 === mes || dataFim.month() + 1 === mes;
                })
            );

            const somaDuracao = atividadesFiltradas.reduce((total, atividade) => {
                return total + atividade.duracao_dias;
            }, 0);

            return somaDuracao;
        },
        getBarStyle(atividade) {
            const marginLeft = this.somaDuracaoDias(atividade)
            return {
                width: `${atividade.duracao_dias * 5}px`,
                'margin-left': `${marginLeft}px`,
                backgroundColor: atividade.situacao === 'IN_PROGRESS' ? '#5E97F6' : '#FDE9B6'
            };
        },
        getTitle(atividade) {
            const data_inicio = dayjs(atividade.data_inicio);
            const data_fim = dayjs(atividade.data_fim);
            return `${atividade.descricao} - ${data_inicio.format('DD/MM/YYYY')} - ${data_fim.format('DD/MM/YYYY')} - ${this.getTotalDays(atividade)} dias`;
        },
        getTotalDays(atividade) {
            const data_inicio = dayjs(atividade.data_inicio);
            const data_fim = dayjs(atividade.data_fim);
            const durationDays = data_fim.diff(data_inicio, 'days');
            return durationDays;
        },
        getTotalDaysGeral() {
            let totalDays = 0;
            this.atividadesStore.atividades.forEach(atividade => {
                const data_inicio = dayjs(atividade.data_inicio);
                const data_fim = dayjs(atividade.data_fim);
                const durationDays = data_fim.diff(data_inicio, 'days');
                totalDays += durationDays;
            });
            return totalDays;
        }
    }
}
</script>