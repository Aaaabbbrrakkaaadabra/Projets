<template>
    <div class="container">
        <Navigation/>
        <Content/>
        <Bouton msg="Firebase"/>
    </div>
</template>

<script>
import Navigation from './Navigation.vue'
import Content from './Content.vue'
import Bouton from './Bouton.vue'

export default {
  name: 'Container',
  components:{
      Navigation,
      Content,
      Bouton,
  }
}


</script>


<style>
.container {
    height: 100vh;
    background: #C2C2C2;
    color: #4e4e4e;
}
</style>