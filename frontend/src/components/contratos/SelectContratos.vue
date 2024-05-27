<template>
    <el-form-item :label="label">
        <el-select :model-value="modelValue" @update:model-value="updateValue" 
         placeholder="Selecionar Contrato..." size="large" style="width: 240px">
            <el-option v-for="setor in this.contratoStore.contratos" 
            :key="setor.uuid" :label="setor.descricao" :value="setor.uuid" />
        </el-select>
    </el-form-item>
</template>

<script>
import { ContratoStore } from '@/store/ContratoStore'

export default {
    name: "RadioGroupSetores",
    props: {
        modelValue: {
            required: true
        },
        label: null
    },
    emits: ['update:modelValue'],
    setup() {
        const contratoStore = ContratoStore()
        contratoStore.listar()
        return { contratoStore }
    },
    mounted() {
    },
    components: {
    },
    methods: {
        updateValue(value) {
            this.$emit('update:modelValue', value);
        }
    }
}
</script>

<style scoped></style>