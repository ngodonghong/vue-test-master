<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Surveys list</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    if (document.getElementById('google-charts')) return; // was already loaded
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://www.gstatic.com/charts/loader.js';
    scriptTag.id = 'google-charts';
    document.getElementsByTagName('head')[0].appendChild(scriptTag);
  }
});
</script>
