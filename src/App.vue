<template>
  <div id="app" class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6">
        <app-header></app-header>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue';
export default {
  name: 'app',
  components: {
    appHeader: Header
  }
}
</script>