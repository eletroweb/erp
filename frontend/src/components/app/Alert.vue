<template>
  <el-alert class="alerta" v-if="alertStore.display" :title="alertStore.title" :type="alertStore.type" show-icon />
</template>

<script>
import { AlertStore } from '@/store/AlertStore'

export default {
  setup() {
    const alertStore = AlertStore()
    return { alertStore }
  },
};
</script>

<style scoped>
.alerta {
  margin-bottom: 5px;
}
</style>