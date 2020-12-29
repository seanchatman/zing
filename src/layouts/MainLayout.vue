<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated bordered class="bg-white text-primary">
      <a href="/">
        <img
          class="q-ml-sm q-mt-sm"
          style="height: 40px"
          alt="Quasar logo"
          src="~assets/zlogo.png"
      /></a>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
};
</script>
