<template>
  <div>
    <el-col
      :span="24"
      class="form-toolbar hidden-xs-only">
      <template v-if="defaultBtns">
        <el-button @click="goBack">返回</el-button>
      </template>
      <slot name="toolbar" />
    </el-col>
    <el-col :span="isMobile?24:layoutSpans[layout]">
      <slot name="content" />
      <el-col
        :span="24"
        class="hidden-sm-and-up">
        <div class="fright default-btns">
          <template v-if="defaultBtns">
            <el-button @click="goBack">返回</el-button>
          </template>
          <slot name="toolbar" />
        </div>
      </el-col>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'CForm',
  props: {
    layout: {
      type: String,
      default: 'half'
    },
    defaultBtns: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      layoutSpans: {
        full: 24,
        half: 12,
        third: 8,
        towThird: 16
      }
    }
  },
  computed: {
    isMobile () {
      return this.$store.getters.isMobile
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    }
  }
}

</script>
<style lang="scss">
.form-toolbar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  min-height: 45px;
}

.default-btns {
  padding-top:5px;
}

</style>
