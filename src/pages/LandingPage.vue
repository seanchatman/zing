<template>
  <div class="container">
    <main class="fit column wrap justify-center items-center">
      <section style="width: 444px; background-color: #ffc800; padding: 20px">
        <div
          class="text-h3 text-white text-center"
          style="text-shadow: 0 1px 2px #000000"
        >
          FIND COVID HELP
        </div>
        <q-btn to="/survey" class="full-width q-mt-lg" color="primary"
          >COVID19 Survey</q-btn
        >
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {};
  },
  // computed: {},
  // watch: {},
  // methods: {},
};
</script>

<style scoped>
.container {
  background-image: url(~assets/survey.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 650px;
}
</style>
