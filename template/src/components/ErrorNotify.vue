<template>
  <section v-show="notify"/>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    notify () {
      let { error, message } = this.$store.state.error
      if (error) {
        this.$message({
          message: message,
          type: 'error'
        })
        this.$store.dispatch('clearError')
      }
      return error
    }
  },
  methods: {}
}

</script>
