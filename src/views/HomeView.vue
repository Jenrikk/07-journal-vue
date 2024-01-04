<template>
  <div class="container home">
    <img alt="Vue logo" src="../assets/logo.png">

    <button @click="goToDaybook" class="btn btn-primary " >Access</button>
  </div>
    
</template>

<script>

export default {
  methods: {
    goToDaybook() {
      this.$router.push({name: 'login'})
    }
  }
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  width: 200px;
}
</style>

