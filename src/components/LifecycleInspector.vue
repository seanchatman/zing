<template>
  <div>Lifecycle Inspector</div>
</template>

<script>
export default {
  name: 'LifecycleInspector',
  beforeCreate() {
    console.log('beforeCreate', process.env, this)
  },
  created() {
    console.log('created', process.env, this)
  },
  beforeMount() {
    console.log('created', process.env, this)
  },
  mounted() {
    console.log('mounted', process.env, this)
  },
  beforeUpdate() {
    console.log('beforeUpdate', process.env, this)
  },
  updated() {
    console.log('updated', process.env, this)
  },
  beforeDestroy() {
    console.log('beforeDestroy', process.env, this)
  },
  destroyed() {
    console.log('destroyed', process.env, this)
  },
  preFetch() {
    console.log('preFetch', process.env, this)
  },
}
</script>
