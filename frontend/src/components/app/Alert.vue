<template>
  <el-alert style="margin-bottom: 5px;" v-if="alertStore.display" :title="alertStore.title" :type="alertStore.type" show-icon />
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

<style scoped></style>