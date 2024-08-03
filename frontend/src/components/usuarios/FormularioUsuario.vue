<template>

    <div class="button-container">
        <Button v-if="this.uuid != null" label="Salvar alterações" @click="usuarioStore.editar()" />
        <Button v-else label="Salvar" @click="usuarioStore.salvar()" />
        <Button label="Cancelar" @click="usuarioStore.cencelar()" severity="secondary" />
    </div>


    <div class="row">
        <div class="column">
            <Fieldset legend="Dados cadastrais">
                <div class="inner-row">
                    <div class="inner-column">
                        <label for="username">Nome</label>
                        <InputText v-model="usuarioStore.usuario.nome" style="width: 320px;" />
                    </div>
                    <div class="inner-column">
                        <label for="situacao">Situação</label>
                        <RadioButton v-model="usuarioStore.usuario.situacao" inputId="ingredient1" name="pizza"
                            value="ATIVO" /> Ativo

                        <RadioButton v-model="usuarioStore.usuario.situacao" inputId="ingredient2" name="pizza"
                            value="INATIVO" /> Inativo
                    </div>
                </div>
                <div class="inner-row">
                    <div class="inner-column">
                        <label for="email">E-mail</label>
                        <InputText v-model="usuarioStore.usuario.email" style="width: 320px" />
                    </div>
                    <div class="inner-column">
                        <label for="username">Senha</label>
                        <Password v-model="usuarioStore.usuario.password" toggleMask />
                    </div>
                </div>
            </Fieldset>

        </div>
        <div class="col-4">
            <Fieldset legend="Cargo">
                <Listbox v-model="usuarioStore.usuario.cargo" :options="usuarioStore.cargosDisponiveis" multiple filter
                    optionLabel="nome" class="w-full md:w-56" />
            </Fieldset>
        </div>
    </div>

    <Fieldset legend="Permissão por Módulo">
        <Accordion value="0">
            <AccordionPanel :key="modulo.uuid" :value="modulo.uuid" v-for="modulo in moduloStore.modulos">
                <AccordionHeader>
                    {{ modulo.nome }}
                </AccordionHeader>
                <AccordionContent>
                    <div class="role" v-if="modulo.roles.length > 0" v-for="role in modulo.roles" :key="role.uuid">
                        <Checkbox v-model="moduloStore.roles" inputId="ingredient1" name="pizza" :value="role.nome" />
                        {{ role.descricao }}
                    </div>
                    <Message v-else severity="warn" :closable="false">
                        Não existem roles configuradas para este módulo
                    </Message>

                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </Fieldset>


</template>

<script>
import { UsuarioStore } from '../../store/UsuarioStore'
import { ModuloStore } from '../../store/configuracao/ModuloStore'
import InputText from 'primevue/inputtext';
import Fieldset from 'primevue/fieldset';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Checkbox from 'primevue/checkbox';
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Message from 'primevue/message';

export default {
    components: {
        InputText,
        RadioButton,
        Password,
        Button,
        Listbox,
        Fieldset,
        Accordion, AccordionPanel, AccordionHeader, AccordionContent,
        Message,
        Checkbox,
        Badge,
        OverlayBadge,
    },
    setup() {
        const usuarioStore = UsuarioStore()
        const moduloStore = ModuloStore()

        moduloStore.listar()

        return { usuarioStore, moduloStore }
    },
    data() {
        return {
            confirmacaoVisivel: false,
            uuid: null,
            setorSelecionado: null,
        }
    },
    async mounted() {
        const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        if (uuidPattern.test(this.$route.params.uuid)) {
            this.uuid = this.$route.params.uuid
            this.usuarioStore.carregar(this.uuid)
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;
    gap: 10px;
}

.container {
    width: 960px;
    margin: 0 auto;
}

.row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.inner-row {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.inner-column {
    flex: 1;
}


.col-1 {
    width: 80px;
}

.col-2 {
    width: 160px;
}

.col-3 {
    width: 240px;
}

.col-4 {
    width: 320px;
}

.col-5 {
    width: 400px;
}

.col-6 {
    width: 480px;
}

.col-7 {
    width: 560px;
}

.col-8 {
    width: 640px;
}

.col-9 {
    width: 720px;
}

.col-10 {
    width: 800px;
}

.col-11 {
    width: 880px;
}

.col-12 {
    width: 960px;
}

.role {
    margin-bottom: 5px;
    ;
}
</style>