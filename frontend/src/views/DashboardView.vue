<template>
  <main>

  </main>
</template>

<script>
import { UsuarioLogadoStore } from '@/store/UsuarioLogadoStore'

export default {
  components: {
  },
  setup() {
    const usuarioLogadoStore = UsuarioLogadoStore()
    usuarioLogadoStore.me()
    return { usuarioLogadoStore }
  },
  data() {
    return {
    };
  },
  mounted() {
  }
}
</script>
