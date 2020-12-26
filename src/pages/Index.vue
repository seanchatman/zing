<template>
  <q-page class="flex flex-center">
    <component v-bind:is=""></component>
  </q-page>
</template>

<script>
import survey from "../assets/survey.json"
export default {
  name: 'PageIndex',
  data(){
    return {
      survey
    }
  },
}
</script>
