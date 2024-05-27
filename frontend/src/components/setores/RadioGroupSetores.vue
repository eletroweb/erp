<template> 
    <el-form-item :label="label">
        <el-radio-group 
            :model-value="modelValue" 
            @update:model-value="updateValue" 
            class="ml-4" 
            name="setor">
            <div v-for="setor in this.setorStore.setores" :key="setor.uuid" style="margin-right: 20px;">
                <el-radio :label="setor.uuid" size="large">
                    {{ setor.descricao }}
                </el-radio>
            </div>
        </el-radio-group>
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