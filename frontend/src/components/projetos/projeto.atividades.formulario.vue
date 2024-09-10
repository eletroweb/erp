<template>
    <Fieldset :legend="atividadeStore.atividade.uuid ? atividadeStore.atividade.descricao : 'Nova atividade'">
        <div class="botoes">

            <div v-if="!atividadeStore.atividade.uuid">
                <Button label="Salvar nova" @click="atividadeStore.cadastrar()" />
            </div>

            <div v-else>
                <Button label="Salvar alteração" severity="info" @click="atividadeStore.salvarEdicao()" />
                <Button severity="danger" label="Excluir" @click="atividadeStore.deletar()" />
            </div>

            <Button severity="secondary" label="Cancelar" @click="atividadeStore.reset()" />
        </div>

        <FloatLabel>
            <InputText id="descricao" v-model="atividadeStore.atividade.descricao" />
            <label for="descricao">Descrição</label>
        </FloatLabel>
        <br>
        <div class="row2">
            <div>
                <Select v-model="atividadeStore.atividade.setor" :options="setorStore.setores" optionLabel="descricao"
                    placeholder="Selecione o Setor..." />
            </div>
            <div>
                <FloatLabel>
                    <DatePicker inputId="dataInicio" v-model="atividadeStore.atividade.data_inicio" showIcon
                        iconDisplay="input" />
                    <label for="descricao">Data início</label>
                </FloatLabel>
            </div>
            <div>
                <FloatLabel>
                    <DatePicker inputId="dataFim" v-model="atividadeStore.atividade.data_fim" showIcon
                        iconDisplay="input" />
                    <label for="descricao">Data fim</label>
                </FloatLabel>
            </div>
        </div>
        <br>
        <div class="situacoes">
            <RadioButton v-model="atividadeStore.atividade.situacao" inputId="situacao1" name="situacao"
                value="PENDING" />
            <label for="situacao1">PENDENTE</label>
            <RadioButton v-model="atividadeStore.atividade.situacao" inputId="situacao2" name="situacao"
                value="IN_PROGRESS" />
            <label for="situacao2">EM ANDAMENTO</label>
            <RadioButton v-model="atividadeStore.atividade.situacao" inputId="situacao3" name="situacao"
                value="CANCELLED" />
            <label for="situacao3">CANCELADA</label>
            <RadioButton v-model="atividadeStore.atividade.situacao" inputId="situacao4" name="situacao"
                value="PAUSED" />
            <label for="situacao4">PAUSADA</label>
            <RadioButton v-model="atividadeStore.atividade.situacao" inputId="situacao5" name="situacao"
                value="COMPLETED" />
            <label for="situacao5">CONCLUÍDA</label>
        </div>
        <br>
        <FloatLabel>
            <Textarea v-model="atividadeStore.atividade.observacao" rows="5" cols="30" />
            <label for="descricao">Observação</label>
        </FloatLabel>
    </Fieldset>

</template>

<script>
import { ProjetoAtividadesStore } from '@/store/ProjetoAtividadesStore'
import { SetorStore } from '../../store/SetorStore'
import InputText from 'primevue/inputtext';
import InputSwitch from 'primevue/inputswitch';
import FloatLabel from 'primevue/floatlabel';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Fieldset from 'primevue/fieldset';

export default {
    name: "ProjetoAtividadesFormulario",
    props: ['projeto'],
    setup() {
        const atividadeStore = ProjetoAtividadesStore()

        const setorStore = SetorStore()
        setorStore.listar()

        return { atividadeStore, setorStore }
    },
    async mounted() {
        const setorStore = SetorStore()
        this.setores = await setorStore.listar();
    },
    components: {
        InputText,
        FloatLabel,
        InputSwitch,
        RadioButton,
        Textarea,
        Select,
        DatePicker,
        Fieldset
    },
    data() {
        return {
        }
    },
    methods: {
        tableRowClassName(rowIndex) {
            if (rowIndex === 1) {
                return 'warning-row'
            } else if (rowIndex === 3) {
                return 'success-row'
            }
            return ''
        }
    }
}
</script>

<style>
#descricao {
    width: 100%;
}

.situacoes {
    margin-bottom: 20px;
}

.row2 {
    display: flex;
    justify-content: start;
    gap: 20px;
    margin-top: 13px;
}

.situacoes label {
    margin-right: 20px;
    margin-left: 20px;
}

textarea {
    width: 100%;
}

.botoes {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-bottom: 10px;
}
</style>