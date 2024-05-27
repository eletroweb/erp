<template>
    <el-form-item :label="label">
        <el-select :model-value="modelValue" @update:model-value="updateValue" 
         placeholder="Selecionar Setor..." size="large" style="width: 240px">
            <el-option v-for="setor in this.setorStore.setores" 
            :key="setor.uuid" :label="setor.descricao" :value="setor.uuid" />
        </el-select>
    </el-form-item>
</template>

<script>
import { SetorStore } from '@/store/SetorStore'

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
        const setorStore = SetorStore()
        setorStore.listar()

        return { setorStore }
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