<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">Nothing selected</h1>
  </div>
  <Fab @on-click="siuu" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    methods: {
      async siuu(){
        console.log('siuuuuuu')
      }
    }
};
</script>

<style lang="scss" scoped>
div{
    height: 100%;
}

</style>