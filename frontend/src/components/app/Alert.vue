<template>
  <Message v-if="alertStore.display" :severity="alertStore.severity">
    {{ alertStore.message }}
  </Message>
</template>

<script>
import { AlertStore } from '@/store/AlertStore'
import Message from 'primevue/message';

export default {
  setup() {
    const alertStore = AlertStore()
    return { alertStore }
  },
  components: {
    Message
  }
};
</script>

<style scoped>
.p-message {
  margin-bottom: 10px;
}
</style>